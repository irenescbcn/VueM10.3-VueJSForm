Vue.component("inputs", {
    template: `
    <div>

        <div class="form-group" >
            <label for="labelComponent">{{labelComponent}}</label>
            <span>*</span>
            <input v-bind="$attrs" @blur="validateInputs" id="labelComponent" class="form-control"  :class="{'is-invalid': inputClass, 'is-valid': inputClass == false, 'none': inputClass == undefined}"  :value="value" @input="$emit('update', $event.target.value)">
            <small id="labelComponent" class="form-text text-danger">{{message}}</small>
        </div>

    </div>
    `,

    props: {
        labelComponent: {type: String},
        value: {type: String},
        inputPassword2: {type: String},
        messageChild: {type: Boolean},
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
            inputClass: undefined,   
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
                    if(!this.value && this.messageChild){
                        this.message = "El nombre es obligatorio";
                        this.errorName = true;
                        this.$emit("errorInputName", this.errorName);
                        this.inputClass = true;  
                    }else if(!this.messageChild){
                        this.message = "";
                        this.inputClass = undefined;
                    }else if(nameRegex.test(this.value)){
                        this.message = "";
                        this.errorName = false;
                        this.$emit("errorInputName", this.errorName); 
                        this.inputClass = false;  
                    }else{
                        this.message = "El nombre ha de contener entre 6 y 13 letras";
                        this.errorName = true;
                        this.$emit("errorInputName", this.errorName);
                        this.inputClass = true;  
                    }
                break;

                case "Teléfono":
                    let mobileRegex =  /^[0-9]{9}$/;
                    if(!this.value && this.messageChild){
                        this.message = "El teléfono es obligatorio";
                        this.errorMobile = true;
                        this.$emit("errorInputMobile", this.errorMobile);
                        this.inputClass = true;
                    }else if(!this.messageChild){
                        this.message = "";
                        this.inputClass = undefined;
                    }else if(mobileRegex.test(this.value)){
                        this.message = "";
                        this.errorMobile = false;
                        this.inputClass = false;
                        this.$emit("errorInputMobile", this.errorMobile);
                    }else{
                        this.message = "El teléfono ha de contener 9 números";
                        this.errorMobile = true;
                        this.inputClass = true;
                        this.$emit("errorInputMobile", this.errorMobile);
                    }   
                break;

                case "Código Postal":
                    let zipRegex =  /^\d{4,8}$/;
                    if(!this.value && this.messageChild){
                        this.message = "El código postal es obligatorio";
                        this.errorZip = true;
                        this.$emit("errorInputZip", this.errorZip);
                        this.inputClass = true;
                    }else if(!this.messageChild){
                        this.message = "";
                        this.inputClass = undefined;
                    }else if(zipRegex.test(this.value)){
                        this.message = "";
                        this.errorZip = false;
                        this.$emit("errorInputZip", this.errorZip);
                        this.inputClass = false;
                    }else{
                        this.message = "El código postal debe contener entre 4 y 8 dígitos";
                        this.errorZip = true;
                        this.$emit("errorInputZip", this.errorZip);
                        this.inputClass = true;
                    }
                break;
                
                case "Correo Electrónico":
                    let emailRegex =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if(!this.value && this.messageChild){
                        this.message = "El correo electrónico es obligatorio";
                        this.errorEmail = true;
                        this.$emit("errorInputEmail", this.errorEmail);
                        this.inputClass = true;
                    }else if(!this.messageChild){
                        this.message = "";
                        this.inputClass = undefined;
                    }else if(emailRegex.test(this.value)){
                        this.message = "";
                        this.errorEmail = false;
                        this.$emit("errorInputEmail", this.errorEmail);
                        this.inputClass = false;
                    }else{
                        this.message= "El correo electrónico no cumple el formato";
                        this.errorEmail = true;
                        this.$emit("errorInputEmail", this.errorEmail);
                        this.inputClass = true;
                    }
                break;

                case "Contraseña":
                    let passwordRegex =  /^(?=[a-zA-Z]*)(?=[a-z]*[A-Z])(?=[A-Z]*[a-z])\S{6,13}$/;

                    if(!this.value && this.messageChild){
                        this.message = "La contraseña es obligatoria";
                        this.errorPassword = true;
                        this.$emit("errorInputPassword", this.errorPassword); 
                        this.inputClass = true;
                    }else if(!this.messageChild){
                        this.message = "";
                        this.inputClass = undefined;
                    }else if(passwordRegex.test(this.value)){                     
                        this.message  = "";
                        this.errorPassword = false;
                        this.$emit("errorInputPassword", this.errorPassword);
                        this.inputClass = false;
                    }else{
                        this.message = "La contraseña debe contener entre 6 y 13 dígitos que contenga mayúsculas y minúsculas";
                        this.errorPassword = true;
                        this.$emit("errorInputPassword", this.errorPassword);
                        this.inputClass = true;
                    } 
                break;

            }
        },
    }

})