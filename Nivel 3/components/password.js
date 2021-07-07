Vue.component("password", {
    template: `
    <div>

        <div class="form-group" >
            <label for="propPassword2">Repita la contraseña</label>
            <span>*</span>
            <input type="password" :class="{'none': passwordClass, 'is-invalid': passwordClass, 'is-valid': passwordClass == false}" v-bind="$attrs" id="propPassword2" class="form-control"  :value="value" @blur="validatePassword2" @input="$emit('update', $event.target.value)">
            <small id="propPassword2" class="form-text text-danger">{{message}}</small>
        </div>

    </div>
    `,
    props: {
        propPassword: {type: String},
        value: {type: String},
        pass2MessageChild:  {type: Boolean},
        
    },

    model:{
        prop: "value",
        event: "update",
    },

    
    mounted(){
        this.message=""
    },
    

    data(){
        return{
            message: "", 
            errorPassword2: false,
            passwordClass: undefined,

        }
    },


    computed: {

        validatePassword2(){  
            if(!this.value && this.pass2MessageChild){
                this.message = "Repita la contraseña";
                this.errorPassword2 = true;
                this.$emit("errorInputPassword2", this.errorPassword2);
                this.passwordClass = undefined;
                return true
            }else if(!this.pass2MessageChild){
                    this.message = "";
                    this.passwordClass = undefined;
                    return false
            }else if(this.propPassword == this.value){
                this.message = "";
                this.errorPassword2 = false;
                this.$emit("errorInputPassword2", this.errorPassword2);
                this.passwordClass = false;
                return false  
            }else{
                this.message = "Las contraseñas deben coincidir";
                this.errorPassword2 = true;
                this.$emit("errorInputPassword2", this.errorPassword2);
                this.passwordClass = true;
                return true 
            }      
        },
    }
})