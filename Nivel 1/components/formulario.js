Vue.component("formulario", {
    template: `

        <div>
            <form @submit.prevent="onSubmit" @keyup="resetForm">
                <inputs :nameMessageChild="nameMessageFather" :labelComponent="idInput.inputName" placeholder="Introduzca su nombre" type="text" v-model="name" @errorInputName="checkErrorName=$event" @messageChild="messageFather=$event"></inputs>

                <inputs :mobileMessageChild="mobileMessageFather" :labelComponent="idInput.inputMobile" placeholder="Introduzca su número de teléfono" type="number" v-model="mobile" @errorInputMobile="checkErrorMobile=$event" ></inputs>

                <inputs :zipMessageChild="zipMessageFather" :labelComponent="idInput.inputZip" placeholder="Introduzca el Código Postal" type="number" v-model="zip" @errorInputZip="checkErrorZip=$event" ></inputs>

                <inputs :emailMessageChild="emailMessageFather" :labelComponent="idInput.inputEmail" placeholder="Introduzca su correo electrónico" type="email" v-model="email" @errorInputEmail="checkErrorEmail=$event"></inputs>

                <button type="submit" class="btn btn-primary mb-2">Enviar</button>
                <div class="p-2 rounded" v-show="show" :class="{'bg-danger': resultClass, 'bg-success': resultClass == false }"><p class="text-light text-center ">{{result}}</p></div>
                          
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
                inputEmail: "Correo Electrónico"
            },

            //V-Models
            name: "",
            mobile: "",
            zip: "",
            email: "",

            //Check errors and display the message
            checkErrorName: false,
            checkErrorMobile: false,
            checkErrorZip: false,
            checkErrorEmail: false,
            result: "", 
            show: false,
            resultClass: undefined,

            //To avoid displaying error messages when reset form
            nameMessageFather: true,
            mobileMessageFather: true,
            zipMessageFather: true,
            emailMessageFather: true,
            
        }
    },
    

    methods: {

        resetForm(){
            this.nameMessageFather = true;
            this.mobileMessageFather = true;
            this.zipMessageFather = true;
            this.emailMessageFather = true;
        },
    
        onSubmit(e) {
            e.preventDefault();        
        
            if(this.checkErrorName || this.checkErrorMobile || this.checkErrorZip || this.checkErrorEmail ){
                this.show = true;
                this.result="Todos los campos deben estar rellenados correctamente";
                setTimeout(()=>{ this.show = false;}, 3000);   
                this.resultClass = true;          
                
            }else if(this.name == "" || this.mobile=="" || this.zip == "" || this.email == ""){
                this.show = true;
                this.result="Todos los campos deben estar rellenados correctamente";
                setTimeout(()=>{ this.show = false;}, 3000);    
                this.resultClass = true;  
            }else{
                this.show = true;
                this.result="Se han enviado los datos correctamente";
                setTimeout(()=>{ this.show = false;}, 3000);
                this.nameMessageFather = false;
                this.mobileMessageFather = false;
                this.zipMessageFather = false;
                this.emailMessageFather = false;
                
                this.name= "";
                this.mobile= "";
                this.zip= "";
                this.email= ""; 
                this.resultClass = false;    
            }
        },

    }

})