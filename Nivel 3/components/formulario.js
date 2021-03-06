Vue.component("formulario", {
    template: `

        <div>
            <form @submit.prevent="onSubmit" @keyup="resetForm">
                <inputs  :messageChild="messageFather" :labelComponent="idInput.inputName" placeholder="Introduzca su nombre" type="text" v-model="name" @errorInputName="checkErrorName=$event" @messageChild="messageFather=$event" ></inputs>

                <inputs :messageChild="messageFather" :labelComponent="idInput.inputMobile" placeholder="Introduzca su número de teléfono" type="number" v-model="mobile" @errorInputMobile="checkErrorMobile=$event" ></inputs>

                <inputs :messageChild="messageFather"  :labelComponent="idInput.inputZip" placeholder="Introduzca el Código Postal" type="number" v-model="zip" @errorInputZip="checkErrorZip=$event" ></inputs>

                <inputs :messageChild="messageFather" :labelComponent="idInput.inputEmail" placeholder="Introduzca su correo electrónico" type="email" v-model="email" @errorInputEmail="checkErrorEmail=$event"></inputs>

                <inputs :messageChild="messageFather"  :labelComponent="idInput.inputPassword" placeholder="Introduzca una contraseña" type="password" v-model="password" @errorInputPassword="checkErrorPassword=$event" :inputPassword2="password2"></inputs>

                <password :pass2MessageChild="pass2MessageFather" v-model="password2" :propPassword="password" @errorInputPassword2="checkErrorPassword2=$event" @inputPassword2="password2=$event" placeholder="Escriba de nuevo la contraseña" ></password>

                <button type="submit" class="btn btn-primary mb-2">Enviar</button>
                <div class=" p-2 rounded" v-show="show" :class="{'bg-danger': resultClass, 'bg-success': resultClass == false }"><p class="text-light text-center ">{{result}}</p></div>
                          
            </form>
        </div>
    `,

    data() {
        return{
            //Input Label
            idInput: {
                inputName: "Nombre",
                inputMobile: "Teléfono",
                inputZip: "Código Postal",
                inputEmail: "Correo Electrónico",
                inputPassword: "Contraseña",                
            },

            //V-Models
            name: "",
            mobile: "",
            zip: "",
            email: "",
            password: "",
            password2: "",
            
            //Check errors and display the message
            checkErrorName: false,
            checkErrorMobile: false,
            checkErrorZip: false,
            checkErrorEmail: false,
            checkErrorPassword: false,
            checkErrorPassword2: false,
            result: "", 
            show: false,
            resultClass: undefined,

            //To avoid displaying error messages when reset form
            messageFather: true,
            pass2MessageFather: true,
        }
    },
    
    

    methods: {

        resetForm(){
            this.messageFather = true;
            this.pass2MessageFather = true;
        },

       
        onSubmit(e) {
            e.preventDefault();  
            
            if(this.checkErrorName || this.checkErrorMobile || this.checkErrorZip || this.checkErrorEmail || this.checkErrorPassword || this.checkErrorPassword2){
                this.show = true;
                this.result="Todos los campos deben estar rellenados correctamente";
                setTimeout(()=>{ this.show = false;}, 3000); 
                this.resultClass = true;
                
            }else if(this.name == "" || this.mobile =="" || this.zip == "" || this.email == "" || this.password == "" || this.password2 == "" ){
                this.show = true;
                this.result="Todos los campos deben estar rellenados correctamente";
                setTimeout(()=>{ this.show = false;}, 3000);  
                this.resultClass = true;

            }else{
                this.show = true;
                this.result="Se han enviado los datos correctamente";
                setTimeout(()=>{ this.show = false;}, 3000);
                this.messageFather = false;
                this.pass2MessageFather = false;
                
                this.name="";
                this.mobile= "";
                this.zip= "";
                this.email= ""; 
                this.password= ""; 
                this.password2 = "";
                this.resultClass = false;
            }

            
        }
        
    },  

})