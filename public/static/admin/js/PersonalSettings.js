var Personal_data_form_user_data = document.querySelector('.Personal_data_form_user_data')
Personal_data_form_user_data.onsubmit = function (){
    // console.log('11')
    // return false
}
var Personal_data_form_user_password = document.querySelector('.Personal_data_form_user_password')
Personal_data_form_user_password.onsubmit = function () {
    var From_item_input_password= this.querySelector('.From_item_input_password');
    var From_item_input_ispassword = this.querySelector('.From_item_input_ispassword')
    if(From_item_input_password.value == 0 && From_item_input_ispassword.value ==0) {
        layer.open({
            title: '提示信息'
            ,content: '请输入要修改的密码！'
        });
        return false;
    }
    if(From_item_input_password.value !== From_item_input_ispassword.value) {
        layer.open({
            title: '提示信息'
            ,content: '密码和上面的不一致！'
        });

        return false;
    }

}