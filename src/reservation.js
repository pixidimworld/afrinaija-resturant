const SUPABASE_URL = 'https://ibfgtoujevkkwckxvvuy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qCs28IVC7cPA3-ABWTetiQ_l8jJFCYc';
const WHATSAPP_NUMBER = '250782647630';

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

export function setupReservationForm() {
  const form = document.querySelector('#bookingForm');
  const dateInput = form?.querySelector('input[type="date"]');
  const status = form?.querySelector('.reservation-status');
  const submit = form?.querySelector('.reservation-submit');
  if (!form || !dateInput || !status || !submit) return;
  const client = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_KEY);

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  dateInput.min = localDate;

  form.addEventListener('input', () => {
    status.textContent = '';
    delete status.dataset.state;
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (!client) {
      status.dataset.state = 'error';
      status.textContent = 'The booking service could not load. Please try again.';
      return;
    }

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

    submit.disabled = true;
    submit.classList.add('is-loading');
    status.dataset.state = 'pending';
    status.textContent = 'Saving your reservation...';

    try {
      const { error } = await client.from('bookings').insert([booking]);
      if (error) throw error;

      const whatsappUrl = createWhatsAppUrl(booking);
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
  });
}
