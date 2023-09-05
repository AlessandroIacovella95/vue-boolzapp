const { createApp } = Vue

createApp({
    data() {
      return {
        searchUser:'',
        newMessage: '',
        activeIndex: 0,
        contacts: [
            {
            name: 'Michele',
            avatar: './img/avatar_1.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Hai portato a spasso il cane?',
            status: 'sent'
            },

            {
            date: '10/01/2020 15:50:00',
            message: 'Ricordati di stendere i panni',
            status: 'sent'
            },

            {
            date: '10/01/2020 16:15:22',
            message: 'Tutto fatto!',
            status: 'received'
            }
            ],
            },

            {
            name: 'Fabio',
            avatar: './img/avatar_2.jpg',
            visible: true,
            messages: [
            {
            date: '20/03/2020 16:30:00',
            message: 'Ciao come stai?',
            status: 'sent'
            },

            {
            date: '20/03/2020 16:30:55',
            message: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
            },

            {
            date: '20/03/2020 16:35:00',
            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
            }
            ],
            },

            {
            name: 'Samuele',
            avatar: './img/avatar_3.jpg',
            visible: true,
            messages: [
            {
            date: '28/03/2020 10:10:40',
            message: 'La Marianna va in campagna',
            status: 'received'
            },

            {
            date: '28/03/2020 10:20:10',
            message: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
            },

            {
            date: '28/03/2020 16:15:22',
            message: 'Ah scusa!',
            status: 'received'
            }
            ],
            },

            {
            name: 'Alessandro B.',
            avatar: './img/avatar_4.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
            },

            {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            status: 'received'
            }
            ],
            },

            {
            name: 'Alessandro L.',
            avatar: './img/avatar_5.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ricordati di chiamare la nonna',
            status: 'sent'
            },

            {
            date: '10/01/2020 15:50:00',
            message: 'Va bene, stasera la sento',
            status: 'received'
            }
            ],
            },

            {
            name: 'Claudia',
            avatar: './img/avatar_6.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao Claudia, hai novità?',
            status: 'sent'
            },

            {
            date: '10/01/2020 15:50:00',
            message: 'Non ancora',
            status: 'received'
            },

            {
            date: '10/01/2020 15:51:00',
            message: 'Nessuna nuova, buona nuova',
            status: 'sent'
            }
            ],
            },

            {
            name: 'Federico',
            avatar: './img/avatar_7.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Fai gli auguri a Martina che è il suo compleanno!',
            status: 'sent'
            },

            {
            date: '10/01/2020 15:50:00',
            message: 'Grazie per avermelo ricordato, le scrivo subito!',
            status: 'received'
            }
            ],
            },

            {
            name: 'Davide',
            avatar: './img/avatar_8.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao, andiamo a mangiare la pizza stasera?',
            status: 'received'
            },

            {
            date: '10/01/2020 15:50:00',
            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
            status: 'sent'
            },

            {
            date: '10/01/2020 15:51:00',
            message: 'OK!!',
            status: 'received'
            }
            ],
            }
        ]
      }
    },

    methods: {
        // * Funziona per definire il contatto attivo
        activeContact(index){
            this.activeIndex = index;
        },
        
        // * Funzione per inviare un nuovo messaggio
        sendMessage(){
            const selectedContact = this.contacts[this.activeIndex];
            if (this.newMessage == '') {
                return
            } 

            selectedContact.messages.push({
                    date:this.getNow(),
                    message: this.newMessage.trim(),
                    status: "sent",
            });
            

            this.newMessage='';
            
            // * Risposta dopo 1 Sec da parte del destinatario
            setTimeout(()=>{
                selectedContact.messages.push({
                    date:this.getNow(),
                    message: 'Ok!',
                    status: "received",
                });
            },1000);  
        },

        // * Funzione per generare la data e orario odierno per i nuovi messaggi
        getNow(){
            const now = new Date();    
            const hours = this.formatDate(now.getHours());
            const minutes = this.formatDate(now.getMinutes());
            const seconds = this.formatDate(now.getSeconds());
            const day = this.formatDate(now.getDay());
            const month = this.formatDate(now.getMonth() +1 );
            const year = this.formatDate(now.getFullYear());
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
        },
        
         // * Funzione per generare l'orario dell'ultimo accesso degli utenti
        lastAccess(){
            const now = new Date();    
            const hours = this.formatDate(now.getHours());
            const minutes = this.formatDate(now.getMinutes());
            return `${hours}:${minutes}`
        },

        // * Funzione per formattare correttamente la data
        formatDate(datePart){
            return datePart < 10 ? '0' + datePart : datePart;
        },
        
        // * Funzione per ricercare in base al testo scritto in input un determinato utente
        searchContact(searchUser) {
            const userInputText = searchUser.trim().toLowerCase();
        
            for (const Textpart of this.contacts) {
                Textpart.visible = Textpart.name.toLowerCase().includes(userInputText);
            }
        }
        
    }

}).mount('#app')