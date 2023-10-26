$(document).ready(function() {
    $('.js-example-basic-single').select2();
    $("#monthlyRent").on("keypress keyup blur",function (event) {proc.numberFormatOnly(event,this.name);});
    $("#area").on("keypress keyup blur",function (event) {proc.numberFormatOnly(event,this.name);});
  
   $('#contractTypesViewTbl').hide();
});

$("#provisions").on("select2:select select2:unselect", function (ehe) {
    //this returns all the selected item
    var items= $(this).val();       
    //Gets the last selected item
    var lastSelectedItem = ehe.params.data.id;
    proc.fetchExpCode(lastSelectedItem);
});

$("#contractPayments").on("select2:select select2:unselect", function (ehe) {
    var items= $(this).val();       
    var lastSelectedItem = ehe.params.data.id;
    proc.generateContractPayment(lastSelectedItem);
});

$('#saveContractType').on('click',function(){
    proc.saveContractType();
});

$('#store').on('change',function(){
    proc.fetchStoreCodes();
});

$("#rent_free_from").on("input", function() {
    var selectedDate = $(this).val();
    var contracts = ["rent_free_month", "rent_free_day"];
    proc.computeContractPeriod(selectedDate,contracts,'rent_free_to',false);
});

$("#contractDay").on("input", function() {
    var selectedDate = $('#contractDateFrom').val();
    var contracts = ["contract_year", "contractMonth", "contractDay"];
    proc.computeContractPeriod(selectedDate,contracts,'contractDateTo',true);
});

var proc = {
    
    'computeSecDep': function(){
        var secDep = $('#securityDeposit').val();
        var monthlyRent = $('#monthlyRent').val();
        var monthlyrentstripped = proc.cleanNumber(monthlyRent);
        var sum = monthlyrentstripped *  secDep;
        var secDepAmount = $('#securityDepositAmount').val(sum.toFixed(2));
    },

    'computeAdvanceRent': function (){
        var secDep = $('#advanceRent').val();
        var monthlyRent = $('#monthlyRent').val();
        var monthlyrentstripped = proc.cleanNumber(monthlyRent);
        var sum = (monthlyrentstripped * secDep) *1.07;
        var secDepAmount = $('#advanceRentAmount').val(sum.toFixed(2));
    },

    'formatMonthlyRent': function(event){
        // $(this).val($(this).val().replace(/[^0-9\.|\,]/g,''));
        $('#monthlyRent').val($('#monthlyRent').val().replace(/[^0-9\.|\,]/g,''));
        if(event.which == 44)
        {
        return true;
        }
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57  )) {
          event.preventDefault();
        }
    },

    'updateTextView': function(){
        var foo = $('#monthlyRent').val();
        var num = proc.getNumber(foo);
        if(num==0){
            $('#monthlyRent').val('');
        }else{
            $('#monthlyRent').val(num.toLocaleString());
        }
    },

    'getNumber': function(_str){
        var arr = _str.split('');
        var out = new Array();
        for(var cnt=0;cnt<arr.length;cnt++){
            if(isNaN(arr[cnt])==false){
            out.push(arr[cnt]);
            }
        }
        return Number(out.join(''));
    },

    'valNumInputDec':function(event) {
        var key, keyChar;
        if (window.event)
            key = window.event.keyCode;
        else if (event)
            key = event.which;
        else
            return true;
        // Check for special characters like backspace
        if (key == null || key == 0 || key == 8 || key == 13 || key == 27)
            return true;
        // Check to see if it's a number
        keyChar =  String.fromCharCode(key);
        if ((/\d/.test(keyChar)) || (/\./.test(keyChar))) {
            window.status = "";
            return true;
        } 
        else {
            window.status = "Field accepts numbers only.";
            return false;
        }
    },
    'redirectTo':function(){
         window.location.href="<?php echo 'http://192.168.200.69:9008/showCreateContract' ?>";
         
    },
    'fetchCity': function(){
            provCode = $("#province").val();
            provText = $("#province option:selected").text();
            $('#provinceText').val(provText)
            axios.get('/city?provCode='+provCode)
               .then(res =>{
                // var data1 = JSON.parse(res.data);
                var data1 = res.data;
				var option = "";
				option += "<option selected disabled value='0'>-- SELECT A CITY/MUNICIPALITY --</option>";
				for (x in data1)
				{
					option += "<option value='"+data1[x]['citymunDesc']+"'>"+data1[x]['citymunDesc']+"</option>";
				}
				$("#municipality").html(option);
               
               })
               .catch(err =>{
                  console.log(err.response)
               }); 
        },

    'fetchStoreCodes': function(){
        var store = $('#store').val();
                //  GET STORE CODES
        axios.post('/fetchStoreCodes?storeCode='+store)
            .then(res =>{
                $('#oracle_code').val(res.data.oracle_code);
                $('#store_comp_code').val(res.data.store_comp_code);
                $('#short_store_name').val(res.data.short_store_name);
            })
            .catch(err =>{
                console.log(err.response)
        });
    },

    'fetchSuppCode': function(selectedProvision){
        var payee = $('#payee').val();
        axios.post('/fecthSuppCode?payee='+payee)
            .then(res =>{
                $('#supplier_code').val(res.data[0]['suppCode']);
                $('#supplier_type').val(res.data[0]['suppType']);
            })
            .catch(err =>{
                console.log(err.response)
        });
    },

    'fetchExpCode': async function(selectedProvision){
        var expCode = $('#exp_code').val();
        var expCodeSelected;

        if(expCode !== ''){
            expCode = expCode.split(',');
        }else{
            expCode = new Array();
        }
    
            // GET EXPCODE 
        const foo = new Array(selectedProvision);
        await axios.post('/fetchExpCode',foo)
            .then(res =>{
                expCodeSelected = res.data;
        });
 
        var selectedProvisionTrim = selectedProvision.replace(/\s/g, '_').toLowerCase();
        selectedProvisionTrim = selectedProvisionTrim.replace(/\(nonvat\)/g, '');
        if(document.getElementById(selectedProvision)){
            const element = document.getElementById(selectedProvision);
            element.remove();
            const index = expCode.indexOf(String(expCodeSelected));
            const x = expCode.splice(index, 1);
            $('#exp_code').val(expCode);
        }else{
            const div = document.createElement('div');
            div.className = 'form-group';
            div.setAttribute("id",selectedProvision);
            div.innerHTML = `
                    <div class="form-group">
                        <label class="control-label col-lg-2"><b>${selectedProvision} Amount</b></label>
                        <div class="col-lg-10">
                            <input name="${selectedProvisionTrim}_amount" id="${selectedProvisionTrim}_amount" type="text" class="form-control" onKeyPress='return proc.valNumInputDec(event);' onkeyup="proc.computeProvisionSqm('${selectedProvisionTrim}',this);">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-lg-2"><b>${selectedProvisionTrim} (Sqm)</b></label>
                        <div class="col-lg-10">
                        <input name="${selectedProvisionTrim}_sqm" id="${selectedProvisionTrim}_sqm" type="text" class="form-control" readonly="readonly">    
                         </div>
                    </div>
                     `;
            document.getElementById('solid-rounded-justified-tab4').appendChild(div);

            expCode.push(expCodeSelected);
            $('#exp_code').val(expCode.join());
        }    
        console.log($('#exp_code').val());
    },

    'computeProvisionSqm': function(provisionName,provisionAmount){  
        if($('#area').val()){
            var contractArea = proc.cleanNumber($('#area').val());
            var provisionAmountClean = proc.cleanNumber(provisionAmount.value);
            var provisionSqm = $('#'+provisionName+'_sqm').val(provisionAmountClean / contractArea);
        }
    },

    'computeSquareMeter': function(){
        var monthlyrentstripped =  proc.cleanNumber($('#monthlyRent').val());
        var areastripped = proc.cleanNumber( $('#area').val());
        if($('#monthlyRent').val()){
            var value = monthlyrentstripped / areastripped;
            var presentableNumber = value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            $('#rateSqm').val(presentableNumber);
        }else{
            $('#rateSqm').val();
        }
    },

    'showCreateModal': function(){
        $('#staticBackdrop').modal('show');
    },

    'saveContractType': function(){
        let contractDates = [];
        let contractNames = [];
        let contractTypeValue = [];
        var slides = document.getElementsByClassName("contractTypeDate");
        var contractName = document.getElementsByClassName("contractTypeName");
        var cnt = 1;
        for (var i = 0; i < slides.length; i++) {
            var foo = $('#date_' + cnt).val();
            console.log(slides.item(i).name);
            console.log(foo);
            if(foo){
                
                var bar = [];
                // var bar = slides.item(i).name + '-'+foo;
                // contractDates.push(bar.push(slides.item(i).name + '-'+foo));
                contractDates.push([slides.item(i).name + '-'+foo, slides.item(i).name,foo]);
                contractNames.push(contractName.item(i).innerText);
                contractTypeValue.push(foo);
            }
            cnt++;
        }

        console.log(contractDates);
        if(contractDates.length > 0){
            // $('#contract_type_report').val(JSON.stringify(contractDates));
            $('#contract_type_header').val(contractNames);
            $('#contract_type_value').val(contractTypeValue);
            $('#contractTypesViewTbl').show();
            $("#modal_large").modal('hide');
                    // CLEAR TABLE ROWS
            $("#contractTypesViewTbl").find("tr:gt(0)").remove();

            // Denotes total number of rows
            var rowIdx = 0;
            var contractDatesCount = contractDates.length;

            for(i=0;i < contractDatesCount;i++){
                // Adding a row inside the tbody.
                $('#contractTypesViewTblBody').append(`<tr id="R${++rowIdx}">
                    <td class="row-index text-center">
                    <p>${contractDates[i][1]}</p>
                    </td>
                    <td class="text-center">
                    ${contractDates[i][2]}
                        </td>
                    </tr>`);
            }  
        }else{
            alert('NO CONTRACT TYPE INPUTTED')
        }
    },

        //  REMOVE COMMA AND SPACES FROM NUMBER
    'cleanNumber': function(x){
        var regex = /[,\s]/g;
        return  x.replace(regex,'');
    },

    'generateContractPayment': function(selectedPayment){
        var selectedPaymentTrim = selectedPayment.replace(/\s/g, '_').toLowerCase();
        if(document.getElementById(selectedPayment)){
            console.log(selectedPayment + ' input found');
            const element = document.getElementById(selectedPayment);
            element.remove();
        }else{

            const div = document.createElement('div');
            div.className = 'form-group';
            div.setAttribute("id",selectedPayment);
            div.innerHTML = `
                    <div class="form-group">
                        <label class="control-label col-lg-2">${selectedPayment}(no. of  months)</label>
                        <div class="col-lg-10">
                            <input name="${selectedPaymentTrim}" id="${selectedPaymentTrim}" type="text" class="form-control" onKeyPress='return proc.valNumInputDec(event);' onkeyup="proc.computePaymentAmount('${selectedPaymentTrim}',this);">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-lg-2">${selectedPaymentTrim}(Amount)</label>
                        <div class="col-lg-10">
                        <input name="${selectedPaymentTrim}_amount" id="${selectedPaymentTrim}_amount" type="text" class="form-control" readonly="readonly">    
                         </div>
                    </div>
                     `;
            document.getElementById('solid-rounded-justified-tab4').appendChild(div);
        }
    },

    'computePaymentAmount': function(paymentName,paymentAmount){  
        if(paymentName == 'security_deposit_donation' || paymentName == 'advance_donation'){
            if($('#donation_amount').val()){
                if(paymentName == 'security_deposit_donation'){
                    var baseAmount = proc.cleanNumber($('#donation_amount').val());
                    var paymentMultiplier = proc.cleanNumber($('#'+paymentName).val());
                    var amount = (baseAmount * paymentMultiplier);
                    $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
                }else{
                    var baseAmount = proc.cleanNumber($('#donation_amount').val());
                    var paymentMultiplier = proc.cleanNumber($('#'+paymentName).val());
                    var amount = baseAmount * paymentMultiplier;
                    $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
                }
            }
        }else if(paymentName == 'advance_cusa'){
            if($('#cusa_amount').val()){
                var baseAmount = proc.cleanNumber($('#cusa_amount').val());
                var paymentMultiplier = proc.cleanNumber($('#'+paymentName).val());
                var amount = baseAmount * paymentMultiplier;
                $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
            }
        }else {
            if($('#monthlyRent').val()){
                var monthlyRent = proc.cleanNumber($('#monthlyRent').val());
                var paymentMultiplierClean = proc.cleanNumber($('#'+paymentName).val());
                if(paymentName == 'security_deposit'){
                    var amount = monthlyRent * paymentMultiplierClean;
                }else{
                    var amount = (monthlyRent * paymentMultiplierClean)*1.07;
                }
    

                $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
            }
        }
    },

    'numberFormatOnly': function(event,name){
        // console.log(name);
        $('#'+name).val($('#'+name).val().replace(/[^0-9\.|\,]/g,''));
        if(event.which == 44)
        {
            return true;
        }
        if ((event.which != 46 || $('#'+name).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57  )) {
          event.preventDefault();
        }
    },

    'computeContractPeriod': function(selectedDate,contractInputID,contractTo,isContract){
        // var dateFrom = new Date(selectedDate);
        if(isContract){
            contractYear = parseInt($('#'+contractInputID[0]).val());
            contractMonth = parseInt($('#'+contractInputID[1]).val());
            contractDay = parseInt($('#'+contractInputID[2]).val());
            var numbersToAdd = [contractYear,contractMonth,contractDay];
            var newDateString = proc.addMonthsToDate(selectedDate, numbersToAdd);
            $('#'+contractTo).val(newDateString[0]);


            // if(contractYear){
            //     dateFrom.setFullYear(dateFrom.getFullYear() + contractYear);
            //     // dateFrom.setDate(dateFrom.getDate() -1);
            // }
            // if(contractMonth){
            //     dateFrom.setMonth(dateFrom.getMonth() + contractMonth);
            //     // dateFrom.setDate(dateFrom.getDate() - 1);
            // }
            // if(contractDay){
            //     dateFrom.setDate(dateFrom.getDate() + contractDay);
            // }

            // dateFrom.setDate(dateFrom.getDate() + 1);


        }else{
            var contractMonth = parseInt($('#'+contractInputID[0]).val());
            var contractDay = parseInt($('#'+contractInputID[1]).val());

            // dateFrom.setMonth(dateFrom.getMonth() + contractMonth);
            var numbersToAdd = [0,contractMonth,contractDay];
            var newDateString = proc.addMonthsToDate(selectedDate, numbersToAdd);
            // console.log(newDateString);
            // console.log(newDateString[0]);
            $('#'+contractTo).val(newDateString[0]);
            $('#contractDateFrom').val(newDateString[1]);


        }
        // var newRentFreePeriodFrom = dateFrom.toISOString().substr(0, 10);
        // var contractToDashes = proc.formatDateToYYYYMMDD(dateFrom);

        // $('#'+contractTo).val(contractToDashes);
        // $('#'+contractTo).val(newDateString);

    },

    'formatDateToYYYYMMDD': function (date){
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    'computeTest': function(){
        var originalDateString = "12-01-2017";
        // var originalDateString = "09-01-2017";

        // var monthsToAdd = 6;
        var numbersToAdd = [9,4,10];
        // var newDateString = proc.addMonthsToDate(originalDateString, monthsToAdd);
        var newDateString = proc.addMonthsToDate(originalDateString, numbersToAdd);

        
        console.log("Original Date:", originalDateString);
        console.log(`Date after Adding Months:`, newDateString);
    },

    'addMonthsToDate': function(dateString, numbersToAdd){
        console.log(dateString);
        var parts = dateString.split('-');
        var originalDate = new Date(parts[0], parts[1] - 1, parts[2]); // Month is zero-based
     
            // COMPUTE YEAR
        if(numbersToAdd[0]){
            originalDate.setFullYear(originalDate.getFullYear() + numbersToAdd[0]);
        }
            // COMPUTE MONTH
        if(numbersToAdd[1]){
            originalDate.setMonth(originalDate.getMonth() + numbersToAdd[1]);
        }
            // COMPUTE DAY
        if(numbersToAdd[2]){
            originalDate.setDate(originalDate.getDate() + numbersToAdd[2]);
        }

        // originalDate.setDate(originalDate.getDate() - 1);
        var year = originalDate.getFullYear();
        var month = String(originalDate.getMonth() + 1).padStart(2, '0');
        var day = String(originalDate.getDate()).padStart(2, '0');
        var plusOneComputedDate = `${year}-${month}-${day}`;

        originalDate.setDate(originalDate.getDate() - 1);
        
        var year = originalDate.getFullYear();
        var month = String(originalDate.getMonth() + 1).padStart(2, '0');
        var day = String(originalDate.getDate()).padStart(2, '0');
        var normalComputedDate = `${year}-${month}-${day}`;

        var contractDates = [normalComputedDate,plusOneComputedDate];
        // return `${year}-${month}-${day}`;
        return contractDates;
    }    

}
