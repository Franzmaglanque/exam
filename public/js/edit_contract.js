 $(document).ready(function() {
    $('.js-example-basic-single').select2();
    $("#monthlyRent").on("keypress keyup blur",function (event) {proc.numberFormatOnly(event,this.name);});
    $("#area").on("keypress keyup blur",function (event) {proc.numberFormatOnly(event,this.name);});
    proc.saveContractType();
});
$("#addContractType").click(function(){
    // proc.populateContractType();
});

$("#provisions").on("select2:select select2:unselect", function (ehe) {
    //this returns all the selected item
    var items= $(this).val();       
    //Gets the last selected item
    var lastSelectedItem = ehe.params.data.id;
    proc.fetchExpCode(lastSelectedItem);
});

$("#contractPayments").on("select2:select select2:unselect", function (ehe) {
    //this returns all the selected item
    var items= $(this).val();       
    //Gets the last selected item
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

$('#terminateContract').on('click',function(){
    proc.terminateContract();
});

var proc = {
    'fetchCity': function(){
            provCode = $("#province").val();
            provText = $("#province option:selected").text();
            $('#provinceText').val(provText)
            axios.get('/city?provCode='+provCode)
               .then(res =>{
                var data1 = res.data;
				var option = "";
				option += "<option selected disabled value='0'>-- SELECT A CITY/MUNICIPALITY --</option>";
				for (x in data1)
				{
					option += "<option value='"+data1[x]['citymunDesc']+"'>"+data1[x]['citymunDesc']+"</option>";
				}
				$("#city").html(option);
               
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

    'fetchSuppCode': function(){
        var payee = $('#payee').val();
        axios.post('/fecthSuppCode?payee='+payee)
            .then(res =>{
                $('#supplier_code').val(res.data[0]['suppCode']);
                $('#supplier_type').val(res.data[0]['suppType']);
                console.log(res.data[0]['suppCode']);
                console.log(res.data[0]['suppType']);
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
            // expCode = new Array();
            // expCode = expCode.split(',');

            expCode.push(expCodeSelected);
            $('#exp_code').val(expCode.join());
        }    
        console.log($('#exp_code').val());
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
        if(contractDates.length > 0){
            // $('#contract_type_report').val(JSON.stringify(contractDates));
            $('#contract_type_header').val(contractNames);
            $('#contract_type_value').val(contractTypeValue);

            // var bar = $('#contract_type_header').val();
            // console.log(bar);

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

    'populateContractType': function(){
        var contract_type_report_hidden = $('#contract_type_report_hidden').val();
        var contract_type_report = JSON.parse(contract_type_report_hidden);
        console.log(contract_type_report);
    },

    'generateContractPayment': function(selectedPayment){
        var selectedPaymentTrim = selectedPayment.replace(/\s/g, '_').toLowerCase();

        if(document.getElementById(selectedPayment)){
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
    'computePaymentAmount': function(paymentName,paymentAmount){  
        // console.log('#'+paymentName);
        if(paymentName == 'advance_donation' || paymentName == 'security_deposit_donation'){
            if($('#donation_amount').val()){
                // console.log($('#donation_amount').val());
                var monthlyRent = proc.cleanNumber($('#donation_amount').val());
                var paymentMultiplierClean = proc.cleanNumber($('#'+paymentName).val()); 
                var amount = monthlyRent * paymentMultiplierClean;
                var foo = amount.toLocaleString('en-US', {maximumFractionDigits:2});
                console.log(monthlyRent);
                console.log(paymentMultiplierClean);
                console.log(amount);
                console.log(foo);

                var paymentAmount = $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
            }
        }else{
            var monthlyRent = proc.cleanNumber($('#monthlyRent').val());
            var paymentMultiplierClean = proc.cleanNumber($('#'+paymentName).val());
            if(paymentName == 'security_deposit'){
                var amount = monthlyRent * paymentMultiplierClean;
            }else{
                var amount = (monthlyRent * paymentMultiplierClean)*1.07;
            }
            var paymentAmount = $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
        }
        // if($('#monthlyRent').val()){
        //     var monthlyRent = proc.cleanNumber($('#monthlyRent').val());
        //     var paymentMultiplierClean = proc.cleanNumber($('#'+paymentName).val());
        //     if(paymentName == 'security_deposit'){
        //         var amount = monthlyRent * paymentMultiplierClean;
        //     }else{
        //         var amount = (monthlyRent * paymentMultiplierClean)*1.07;
        //     }
        //     var paymentAmount = $('#'+paymentName+'_amount').val(amount.toLocaleString('en-US', {maximumFractionDigits:2}));
        // }
    },

    'computeProvisionSqm': function(provisionName,provisionAmount){  
        if($('#area').val()){
            console.log(provisionName);
            var contractArea = proc.cleanNumber($('#area').val());
            var provisionAmountClean = proc.cleanNumber(provisionAmount.value);
            var provisionSqm = $('#'+provisionName+'_sqm').val(provisionAmountClean / contractArea);
        }
    },

      // REMOVE COMMA AND SPACES FROM NUMBER
    'cleanNumber': function(x){
        var regex = /[,\s]/g;
        return  x.replace(regex,'');
    },

    'terminateContract': function(){
        var headerID = $('#contract_header').val();
        console.log(headerID);
        Swal.fire({
            title: 'Are you sure you want to Terminate Contract?',
            showDenyButton: true,
            confirmButtonText: 'Terminate',
            denyButtonText: `Cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    data: {
                        // "_token": "{{ csrf_token() }}",
                        headerID: headerID
                    },
                    headers: {
                        'X-CSRF-Token': $('meta[name="_token"]').attr('content')
                    },
                    url: 'terminateContract',
                    beforeSend: function () {
                    },
                    error: function (xhr) {
                        Swal.fire({
                            icon: 'error',
                            title: xhr.status,
                            text: xhr.statusText,
                        });
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.status){
                            Swal.fire({
                                icon: 'success',
                                title: data.message,
                            });
                            // window.location.href = "http://leasing.puregold.local/index";
                            window.location.href = "index";
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: data.message,
                                text: 'Please Contact System Administrator',
                            });
                        }
                        
                    },
                    complete: function () {
                    }
                });
            } 
          
          })
    },

    'computeContractPeriod': function(selectedDate,contractInputID,contractTo,isContract){
        if(isContract){
            contractYear = parseInt($('#'+contractInputID[0]).val());
            contractMonth = parseInt($('#'+contractInputID[1]).val());
            contractDay = parseInt($('#'+contractInputID[2]).val());
            var numbersToAdd = [contractYear,contractMonth,contractDay];
            var newDateString = proc.addMonthsToDate(selectedDate, numbersToAdd);
            $('#'+contractTo).val(newDateString[0]);
        }else{
            var contractMonth = parseInt($('#'+contractInputID[0]).val());
            var contractDay = parseInt($('#'+contractInputID[1]).val());
            var numbersToAdd = [0,contractMonth,contractDay];
            var newDateString = proc.addMonthsToDate(selectedDate, numbersToAdd);
            $('#'+contractTo).val(newDateString[0]);
            $('#contractDateFrom').val(newDateString[1]);
        }
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
        return contractDates;
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
}