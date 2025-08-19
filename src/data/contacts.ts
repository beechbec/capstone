export const COMPANY_CONTACT = {
  companyName: 'B.J. Santiago Inc.',
  phone: '+63 (2) 8123 4567',
  mobile: '+63 917 123 4567',
  email: 'info@bjsantiago.example',
  address:
    '123 España Blvd, Sampaloc, Manila, Philippines',
  hours: 'Mon–Sat, 9:00 AM – 6:00 PM',
}

export function formatContactForChat(): string {
  const c = COMPANY_CONTACT
  return [
    `${c.companyName} — Contact Details`,
    `Phone: ${c.phone}`,
    `Mobile: ${c.mobile}`,
    `Email: ${c.email}`,
    `Address: ${c.address}`,
    `Business Hours: ${c.hours}`,
  ].join('\n')
}


