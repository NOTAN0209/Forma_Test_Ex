### START PROJECT ###
- cd my-app
- npm start

 ### Form Add Validation ###
1. The form can contain the following fields: "phone number", "name" and "message".
2. The template for filling in the "phone number" field is represented as a standard mask +7 (999) 999-99-99 (use react input mask)
3. The phone number is validated when sending, and is reduced to the form +79999999999 . Prepared data for sending ajax in json format.
4. The fields "Name" and "Message" are checked for filling and validated for the presence of specials. characters.
5. The output of information about:
- Sending the form successfully/error;
- The field is filled incorrectly;
- The field is filled correctly;
6. The form should be displayed on the page as a modal, call by button.
