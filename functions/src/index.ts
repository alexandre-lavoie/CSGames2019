import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const verify = functions.https.onCall(async (data: {id: string, answer: string}, context) => {
    const question_doc = await db.collection('questions').doc(data.id).get();
    const question = question_doc.data();

    if(question) {
        const answer_doc = await question.answer.get();
        const answer = answer_doc.data();
        const valid = answer.value === data.answer.trim();

        await db.collection('questions').doc(data.id).collection('submissions').add({user: (context.auth) ? context.auth.uid : 0, valid});

        return valid;
    }

    return false;
})