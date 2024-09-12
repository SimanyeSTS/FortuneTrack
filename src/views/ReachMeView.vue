<template>
    <h1>Reach Me</h1>
    <p class="subtitle">I would love to hear from you, please do get in touch using the form below.</p>
    
    <div class="contact-section">
      <div class="contact-info">
        <p>
          <a href="mailto:simanyesomdaka@gmail.com">
            <i class="bi bi-envelope-at-fill icon"></i>
          </a>
          <span class="spacing">simanyesomdaka@gmail.com</span>
        </p>
  
        <p>
          <a href="https://www.linkedin.com/in/simanye-somdaka-6501712b2" target="_blank">
            <i class="bi bi-linkedin icon"></i>
          </a>
          <span class="spacing">Simanye Somdaka</span>
        </p>
  
        <p>
          <i class="bi bi-telephone-fill icon"></i>
          <span class="spacing">+27 73 063 3069</span>
        </p>
  
        <p>
            <i class="bi bi-geo-alt-fill icon"></i>
            <span class="spacing">Weltevreden Valley North, <br> 
                <span class="indent">Cape Town,</span> <br> 
                <span class="indent">Western Cape</span>
            </span>
        </p>
      </div>
  
      <form @submit.prevent="handleSubmit" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <div class="form-group">
          <input placeholder="Your Name" type="text" id="name" v-model="form.name" required />
        </div>
  
        <div class="form-group">
          <input placeholder="Your Email" type="email" id="email" v-model="form.email" required />
        </div>
  
        <div class="form-group">
          <input placeholder="Subject" type="text" id="subject" v-model="form.subject" required />
        </div>
  
        <div class="form-group">
          <textarea placeholder="Your Message ;)" id="message" v-model="form.message" required></textarea>
        </div>
  
        <div class="button-group">
          <button type="submit" class="btn btn-secondary">Send</button>
        </div>
  
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        error: ''
      }
    },
    methods: {
      handleSubmit() {
        this.error = '';
        if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
          this.error = "Please complete all fields before submitting.";
          return;
        }
        Swal.fire({
          title: 'Sending...',
          html: '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        fetch("https://formspree.io/f/mdknjqwv", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        })
        .then(response => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Message Sent',
              text: 'Thank you for getting in touch! I will be sure to reply at my earliest convenience.'
            })
            this.clearForm()
          } else {
            this.error = 'There was an error sending your message. Please try again later.'
          }
        })
        .catch(() => {
          this.error = 'There was an error sending your message. Please try again later.'
        })
      },
      clearForm() {
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        this.error = '';
      }
    }
  }
  </script>

<style scoped>
 .contact-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 20px;
}

.contact-info {
  flex: 1;
  padding: 0 20px;
  max-width: 400px;
}

.contact-form {
  flex: 1;
  padding: 0 20px;
  max-width: 600px;
}

.form-group {
  margin-bottom: 1rem;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: black;
  font-size: 1.3rem;
}

textarea {
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-left: 1rem;
  background-color: white;
  color: #4169E1;
  border: 2px solid #4169E1;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 40%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4169E1;
  color: black;
  border: solid black;
}

.error-message {
  color: red;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
}

.spacing {
  margin-left: 2%; 
}

.indent {
  margin-left: 8%;
}

.bi {
  color: #688eff;
}

.bi:hover {
  color: white;
}

h1 {
  margin-top: 1%;
  margin: 1%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}

.subtitle {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 50px;
}

input[type="text"]:hover,
input[type="email"]:hover,
textarea:hover {
  border: solid #688eff;
}
</style>