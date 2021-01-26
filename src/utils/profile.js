export const getNotNullContacts = (profileContacts) => {
    let contacts = [];

    for (let social in profileContacts) {
        if (profileContacts[social] !== null) {
            contacts.push({
                link: profileContacts[social],
                social
            })
        }
    }

    return contacts;
}