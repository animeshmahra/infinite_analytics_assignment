import axios from 'axios';

export async function sendEmail(details) {

    const formData = new FormData();
    formData.append('from', 'animeshmahra@gmail.com');
    formData.append('to', details.email);
    formData.append('subject', 'Invoice');
    formData.append('bodyHtml', `Hi this mail is to remind you that you about invoice ${details.invoiceNumber} is late.`);

    try {
        const response = await axios.post(
            'https://api.elasticemail.com/v2/email/send', formData,
            {
                params: {
                    apiKey: '' // place your elastic mail api key here
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log(response)
    } catch(error){
        console.log(error)
    }
}
