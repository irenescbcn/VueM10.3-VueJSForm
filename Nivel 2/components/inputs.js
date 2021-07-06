Vue.component("inputs", {
    template: `
    <div>

        <div class="form-group" >
            <label for="labelComponent">{{labelComponent}}</label>
            <span>*</span>
            <input  v-bind="$attrs" @blur="validateInputs" id="labelComponent" class="form-control"  :value="value" @input="$emit('update', $event.target.value)">
            <small id="labelComponent" class="form-text text-danger">{{message}}</small>
        </div>

    </div>
    `,

    props: {
        labelComponent: {type: String},
        value: {type: String},
        inputPassword2: {type: String},
        nameMessageChild: {type: Boolean},
        mobileMessageChild: {type: Boolean},
        zipMessageChild: {type: Boolean},
        emailMessageChild:  {type: Boolean},
        passMessageChild:  {type: Boolean},
    },

    model:{
        prop: "value",
        event: "update",
    },

    data(){
        return{
            message: "",        
            errorName: false, 
            errorMobile: false,
            errorZip: false,
            errorEmail: false, 
            errorPassword: false,
                
        }
    },
    
    watch: {
       
        value(newValue){
            this.value = newValue;
            this.validateInputs(newValue);
        },
    
    },



    methods:{
        validateInputs(){ 
            switch(this.labelComponent){
                case "Nombre":
                    let nameRegex =  /^[a-z]{6,13}$/i;
                    if(!this.value && this.nameMessageChild){
                        this.message = "El nombre es obligatorio";
                        this.errorName = true;
                        this.$emit("errorInputName", this.errorName);
                        return true;
                    }else if(!this.nameMessageChild){
                        this.message = "";
                    }else if(nameRegex.test(this.value)){
                        this.message = "";
                        this.errorName = false;
                        this.$emit("errorInputName", this.errorName); 
                        return false;   
                    }else{
                        this.message = "El nombre ha de contener entre 6 y 13 letras";
                        this.errorName = true;
                        this.$emit("errorInputName", this.errorName);
                        return true;
                    }
                break;

                case "Teléfono":
                    let mobileRegex =  /^[0-9]{9}$/;
                    if(!this.value && this.mobileMessageChild){
                        this.message = "El teléfono es obligatorio";
                        this.errorMobile = true;
                        this.$emit("errorInputMobile", this.errorMobile);
                        return true;
                    }else if(!this.mobileMessageChild){
                        this.message = "";
                    }else if(mobileRegex.test(this.value)){
                        this.message = "";
                        this.errorMobile = false;
                        this.$emit("errorInputMobile", this.errorMobile);
                        return false;
                    }else{
                        this.message = "El teléfono ha de contener 9 números";
                        this.errorMobile = true;
                        this.$emit("errorInputMobile", this.errorMobile);
                        return true;
                    }   
                break;

                case "Código Postal":
                    let zipRegex =  /^\d{4,8}$/;
                    if(!this.value && this.zipMessageChild){
                        this.message = "El código postal es obligatorio";
                        this.errorZip = true;
                        this.$emit("errorInputZip", this.errorZip);
                        return true;
                    }else if(!this.zipMessageChild){
                        this.message = "";
                    }else if(zipRegex.test(this.value)){
                        this.message = "";
                        this.errorZip = false;
                        this.$emit("errorInputZip", this.errorZip);
                        return false;
                    }else{
                        this.message = "El código postal debe contener entre 4 y 8 dígitos";
                        this.errorZip = true;
                        this.$emit("errorInputZip", this.errorZip);
                        return true;
                    }
                break;
                
                case "Correo Electrónico":
                    let emailRegex =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if(!this.value && this.emailMessageChild){
                        this.message = "El correo electrónico es obligatorio";
                        this.errorEmail = true;
                        this.$emit("errorInputEmail", this.errorEmail);
                    }else if(!this.emailMessageChild){
                        this.message = "";
                    } else if(emailRegex.test(this.value)){
                        this.message = "";
                        this.errorEmail = false;
                        this.$emit("errorInputEmail", this.errorEmail);
           
                    }else{
                        this.message= "El correo electrónico no cumple el formato";
                        this.errorEmail = true;
                        this.$emit("errorInputEmail", this.errorEmail);
                    }
                break;

                case "Contraseña":
                    let passwordRegex =  /^(?=[a-zA-Z]*)(?=[a-z]*[A-Z])(?=[A-Z]*[a-z])\S{6,13}$/;

                    if(!this.value && this.passMessageChild){
                        this.message = "La contraseña es obligatoria";
                        this.errorPassword = true;
                        this.$emit("errorInputPassword", this.errorPassword); 
                    }else if(!this.passMessageChild){
                        this.message = "";
                    }else if(passwordRegex.test(this.value)){                     
                        this.message  = "";
                        this.errorPassword = false;
                        this.$emit("errorInputPassword", this.errorPassword);
                    }else{
                        this.message = "La contraseña debe contener entre 6 y 13 dígitos que contenga mayúsculas y minúsculas";
                        this.errorPassword = true;
                        this.$emit("errorInputPassword", this.errorPassword);
                    }                    
                break;     
            }
        },
    }

})