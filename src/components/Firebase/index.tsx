import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import { SnackbarProviderValue } from 'material-ui-snackbar-provider/lib/SnackbarContext';
import { IQuestion } from '../QuestionCard';
import { IHub } from '../Hubs';

class Firebase {

    auth: firebase.auth.Auth
    db: firebase.firestore.Firestore
    user: firebase.auth.UserCredential | null
    questions: IQuestion[] | null
    hubs: IHub[] | null
    functions: firebase.functions.Functions

    constructor() {
        firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG))
        this.auth = firebase.auth()
        this.db = firebase.firestore()
        this.functions = firebase.functions()
        let localUser = localStorage.getItem('user');
        this.user = (localUser) ? JSON.parse(localUser) : null
        this.questions = null
        this.hubs = null
    }

    googleLogin() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            this.user = user;
        })
    }

    isLoggedIn() {
        return this.user != null;
    }

    getHubs(callback: Function) {
        if (this.hubs) {
            callback(this.hubs);
        } else {
            this.db.collection('hubs').get().then((snap) => {
                this.hubs = snap.docs.map((doc) => doc.data() as IHub);

                callback(this.hubs);
            })
        }
    }

    verifyQuestion(id: string, answer: string, snackbar?: SnackbarProviderValue) {
        this.functions.httpsCallable('verify')({ id, answer }).then(result => {
            if (this.questions) {
                let question = this.questions.find(e => e.id === id)
                if (question) {
                    if (question.submissions) {
                        question.submissions.push({ user: (this.user && this.user.user) ? this.user.user.uid : '0', valid: result.data })
                    } else {
                        question.submissions = [{ user: (this.user && this.user.user) ? this.user.user.uid : '0', valid: result.data }]
                    }
                }
            }

            if (snackbar) {
                if (result.data) {
                    snackbar.showMessage('Correct Answer')
                } else {
                    snackbar.showMessage('Incorrect Answer')
                }
            }
        })
    }

    getQuestion(id: string, callback: Function) {
        this.getQuestions((questions: [IQuestion]) => {
            let question = questions.find((e) => e.id === id);

            if (question) {
                callback(question);
                return;
            }
        });
    }

    getQuestions(callback: Function) {
        if (this.questions) {
            console.log(this.questions)
            callback(this.questions);
        } else {
            this.db.collectionGroup('submissions').get().then((snap) => {
                let questions_submissions: { [key: string]: [{ valid: boolean, user: string }] } = {};

                snap.docs.forEach((doc) => {
                    let question_id = doc.ref?.parent?.parent?.id;

                    if (question_id) {
                        if (question_id in questions_submissions) {
                            questions_submissions[question_id].push(doc.data() as { valid: boolean, user: string })
                        } else {
                            questions_submissions[question_id] = [doc.data() as { valid: boolean, user: string }]
                        }
                    }
                })

                this.db.collection('questions').get().then((snap) => {
                    this.questions = snap.docs.map((doc) => {
                        let question_id = doc.ref.id;

                        let question = { id: question_id, ...doc.data() as IQuestion };

                        if (question_id in questions_submissions) {
                            question['submissions'] = questions_submissions[question_id];
                        }

                        return question;
                    });

                    callback(this.questions);
                })
            })
        }
    }

    createHub(name: string, location: string, contact: string, snackbar?: SnackbarProviderValue) {
        let [latitude, longitude] = location.split(',').map(key => key.trim());

        this.db.collection('hubs').add({ name, location: new firebase.firestore.GeoPoint(parseFloat(latitude), parseFloat(longitude)), contact, organizer: (this.user && this.user.user) ? this.user.user.displayName : 'Anonymous' }).then(snap => {
            snap.collection('users').add({ user: (this.user && this.user.user) ? this.user.user.uid : 0 }).then(_ => {
                if (snackbar) {
                    snackbar.showMessage('Created Hub')
                }
            })
        }).catch(_ => {
            if (snackbar) {
                snackbar.showMessage('Error Creating Hub')
            }
        })
    }

    createQuestion(title: string, description: string, answer: string, snackbar?: SnackbarProviderValue) {
        this.db.collection('answers').add({ value: answer.trim() }).then(snap => {
            this.db.collection('questions').add({ title, description, answer: snap }).then(_ => {
                if (snackbar) {
                    snackbar.showMessage('Created Question')
                }
            }).catch(_ => {
                if (snackbar) {
                    snackbar.showMessage('Error Creating Question')
                }
            })
        })
    }
}

export default new Firebase();