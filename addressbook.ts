export class AddressBook {

}

export function formatDate(date) {
  return (
    date.toISOString()
    .replace(/[-:]+/g, '')
    .split('.')[0] + 'Z'
  )
}

function getFullName(contact) {
  return [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(' ')
}