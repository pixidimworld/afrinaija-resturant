const SUPABASE_URL = 'https://ibfgtoujevkkwckxvvuy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qCs28IVC7cPA3-ABWTetiQ_l8jJFCYc';
const WHATSAPP_NUMBER = '250782647630';
const SUPABASE_SCRIPT = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
const COMMITMENT_MINIMUM_GUESTS = 5;
const MAXIMUM_GUESTS = 400;
const COMMITMENT_PER_GUEST = 20000;
let clientPromise;

const getSupabaseClient = () => {
  if (clientPromise) return clientPromise;

  clientPromise = new Promise((resolve, reject) => {
    const createClient = () => {
      const client = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_KEY);
      if (client) resolve(client);
      else reject(new Error('Supabase client is unavailable.'));
    };

    if (window.supabase?.createClient) {
      createClient();
      return;
    }

    const script = document.createElement('script');
    script.src = SUPABASE_SCRIPT;
    script.async = true;
    script.dataset.supabaseClient = 'true';
    script.addEventListener('load', createClient, { once: true });
    script.addEventListener('error', () => reject(new Error('Supabase failed to load.')), { once: true });
    document.head.append(script);
  }).catch(error => {
    clientPromise = undefined;
    throw error;
  });

  return clientPromise;
};

const createWhatsAppUrl = booking => {
  const address = booking.address || 'Not provided';
  const specialRequest = booking.special_request || 'Not provided';
  const message = [
    'Hello AfriNaija Pots, I would like to make a reservation.',
    '',
    'Full Name: ' + booking.name,
    'Phone Number: ' + booking.phone,
    'Booking Date: ' + booking.booking_date,
    'Booking Time: ' + booking.booking_time,
    'Number of Guests: ' + booking.number_of_guests,
    'Address: ' + address,
    'Special Request: ' + specialRequest,
    '',
    'Please confirm my reservation and let me know if you need any additional information. Thank you.'
  ].join('\n');

  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
};

const formatRwf = amount => new Intl.NumberFormat('en-US').format(amount);

const createCommitmentWhatsAppUrl = booking => {
  const address = booking.address || 'Not provided';
  const specialRequest = booking.special_request || 'Not provided';
  const commitmentTotal = booking.number_of_guests * COMMITMENT_PER_GUEST;
  const message = [
    'Hello AfriNaija Pots, I would like to confirm a large-group reservation.',
    '',
    'Name: ' + booking.name,
    'Phone: ' + booking.phone,
    'Date: ' + booking.booking_date,
    'Time: ' + booking.booking_time,
    'Number of guests: ' + booking.number_of_guests,
    'Address: ' + address,
    'Special request: ' + specialRequest,
    '',
    'Commitment payment:',
    'RWF ' + formatRwf(COMMITMENT_PER_GUEST) + ' × ' + booking.number_of_guests + ' guests = RWF ' + formatRwf(commitmentTotal),
    '',
    'I am ready to make the advance commitment payment. Please send me the MoMo payment details so I can proceed. Thank you.'
  ].join('\n');

  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
};

export function setupReservationForm() {
  const form = document.querySelector('#bookingForm');
  const dateInput = form?.querySelector('input[type="date"]');
  const guestInput = form?.querySelector('#guests');
  const status = form?.querySelector('.reservation-status');
  const submit = form?.querySelector('.reservation-submit');
  const commitmentOverlay = document.querySelector('.commitment-overlay');
  const commitmentModal = commitmentOverlay?.querySelector('.commitment-modal');
  const commitmentGuests = commitmentOverlay?.querySelector('[data-commitment-guests]');
  const commitmentTotal = commitmentOverlay?.querySelector('[data-commitment-total]');
  const commitmentProceed = commitmentOverlay?.querySelector('.commitment-primary');
  const commitmentCancel = commitmentOverlay?.querySelector('.commitment-secondary');
  if (
    !form || !dateInput || !guestInput || !status || !submit || !commitmentOverlay ||
    !commitmentModal || !commitmentGuests || !commitmentTotal || !commitmentProceed || !commitmentCancel
  ) return;

  let pendingBooking;
  let modalPreviousFocus;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  dateInput.min = localDate;

  const validateGuestCount = () => {
    const value = guestInput.value.trim();
    if (!value) {
      guestInput.setCustomValidity('');
      return;
    }

    const guestCount = Number(value);
    if (!Number.isInteger(guestCount)) {
      guestInput.setCustomValidity('Please enter a whole number of guests.');
    } else if (guestCount < 1) {
      guestInput.setCustomValidity('A reservation requires at least 1 guest.');
    } else if (guestCount > MAXIMUM_GUESTS) {
      guestInput.setCustomValidity('The maximum reservation size is 400 guests.');
    } else {
      guestInput.setCustomValidity('');
    }
  };

  const closeCommitmentModal = (restoreFocus = true) => {
    commitmentOverlay.classList.remove('is-open');
    commitmentOverlay.setAttribute('aria-hidden', 'true');
    pendingBooking = undefined;
    if (restoreFocus) modalPreviousFocus?.focus();
  };

  const openCommitmentModal = booking => {
    pendingBooking = booking;
    modalPreviousFocus = document.activeElement;
    commitmentGuests.textContent = String(booking.number_of_guests);
    commitmentTotal.textContent = 'RWF ' + formatRwf(booking.number_of_guests * COMMITMENT_PER_GUEST);
    commitmentOverlay.classList.add('is-open');
    commitmentOverlay.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => commitmentProceed.focus());
  };

  const submitReservation = async (booking, isCommitmentReservation = false) => {
    submit.disabled = true;
    submit.classList.add('is-loading');
    status.dataset.state = 'pending';
    status.textContent = 'Saving your reservation...';

    try {
      const client = await getSupabaseClient();
      const { error } = await client.from('bookings').insert([booking]);
      if (error) throw error;

      const whatsappUrl = isCommitmentReservation
        ? createCommitmentWhatsAppUrl(booking)
        : createWhatsAppUrl(booking);
      form.reset();
      status.dataset.state = 'success';
      status.textContent = 'Reservation saved. Opening WhatsApp for confirmation...';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Reservation submission failed:', error);
      status.dataset.state = 'error';
      status.textContent = 'Something went wrong. Please try again.';
    } finally {
      submit.disabled = false;
      submit.classList.remove('is-loading');
    }
  };

  guestInput.addEventListener('input', validateGuestCount);

  form.addEventListener('input', () => {
    status.textContent = '';
    delete status.dataset.state;
  });

  form.addEventListener('focusin', () => {
    getSupabaseClient().catch(() => {});
  }, { once: true });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    validateGuestCount();
    if (!form.reportValidity()) return;

    const booking = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      address: form.elements.address.value.trim() || null,
      booking_date: form.elements.date.value,
      booking_time: form.elements.time.value,
      number_of_guests: Number.parseInt(form.elements.guests.value, 10),
      special_request: form.elements.request.value.trim() || null
    };

    if (booking.number_of_guests >= COMMITMENT_MINIMUM_GUESTS) {
      openCommitmentModal(booking);
      return;
    }

    await submitReservation(booking);
  });

  commitmentCancel.addEventListener('click', () => closeCommitmentModal());

  commitmentProceed.addEventListener('click', async () => {
    if (!pendingBooking) return;
    const booking = pendingBooking;
    closeCommitmentModal(false);
    await submitReservation(booking, true);
  });

  document.addEventListener('keydown', event => {
    if (!commitmentOverlay.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeCommitmentModal();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = [...commitmentModal.querySelectorAll('button:not(:disabled)')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, true);
}
