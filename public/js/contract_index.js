$(document).ready(function() {
    $('.js-example-basic-single').select2();
    $('#contractForm').submit(function(e) {
        // e.preventDefault();
        // or return false;
    });
    proc.fetchContracts();
});
    $('#uploadContractButton').on('click',function(){
        proc.uploadContract();
    });
    $('#testButton').on('click',function(){
        proc.testContract();
    });

    var proc = {
        'testContract': function(){
            // console.log($('#actionType').val());
            console.log('dsadsdsa');
        },

        'showSummaryModal': function(id,name){
            console.log(id);
            $('#contractID').val(id);
            $('#actionType').val(name);
            $('#staticBackdrop').modal('show');
        },

        'saveContract': function(){
            provCode = $("#province option:selected").text();
            provisionArray = $('#provision').val();
            var contract = $('#contractForm').serialize() + "&provinceText=" + provCode + "&provisionArray="+ provisionArray;
            axios.post('/saveContractHeader',contract)
            .then(res =>{
                Swal.fire({
                title: 'Success!',
                text: 'You have successfully created Contract',
                icon: 'success',
                confirmButtonText: 'Cool'
                });
                this.clearInput();
            // console.log(JSON.stringify(this.lessors));
            })
            .catch(err =>{
                console.log(err.response)
            }); 
        },
        'fetchContracts': function(){
            $('#contractTbl').DataTable(
            {
            destroy: true,
            ajax: {
                type: 'POST',
                dataType: 'json',
                // contentType: 'application/json: charset=utf-8',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                url: '/contracts',
                // data: {
                //     "_token": "{{ csrf_token() }}"
                // },
                dataSrc: 'data'
            },
            drawCallback: function () {
                // addDisable('#voidBtn');
            },
            // processing: false,
            serverSide: true,
            // searching: true,
            // stateSave: false,
        //     columnDefs: [
        //     {
        //         targets: -1,
        //         data: null,
        //         defaultContent: "<button id='id'>Click!</button>",
        //     },
        // ],
            columns: [
                {title: 'Lessor', name: 'lessor', index: 'status', align: 'center', sortable: true, search: true, data: 'lessor'},
                {title: 'Store', name: 'store', index: 'company', align: 'center', sortable: true, search: true, data: 'store'},
                {title: 'Payee', name: 'payee', index: 'vendor_code', align: 'center', sortable: true, search: true, data: 'payee'},
                {title: 'Address', name: 'address', index: 'supplier_name', align: 'center', sortable: true, search: true, data: 'address'},
                {title: 'Lease Type', name: 'leaseType', index: 'cheque_num', align: 'center', sortable: true, search: true, data: 'leaseType'},
                {title: 'Monthly Rent', name: 'monthlyRent', index: 'cheque_num', align: 'center', sortable: true,search: true, data: 'monthlyRent'},
                {title: 'Area', name: 'area', index: 'cheque_num', align: 'center', sortable: true,search: true, data: 'area'},
                {title: 'Contract Date Start', name: 'contractDateStart', index: 'cheque_num', align: 'center', sortable: true, search: true, data: 'contractDateTo'},
                {title: 'Contract Date End', name: 'contractDateEnd', index: 'cheque_num', align: 'center', sortable: true, search: true, data: 'contractDateFrom'},
                {data: null,
                    render: function (data, type, row, meta) {
                        return `
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                           
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" id="${row.id}" name="summary" onclick="proc.showSummaryModal(this.id,this.name);">Upload Summary</a></li>
                                    <li><a class="dropdown-item" href="#" id="${row.id}" name="pvcomp" onclick="proc.showSummaryModal(this.id,this.name);">Upload PVCOMP</a></li>
                                    <li><a class="dropdown-item" href="#" id="${row.id}" name="provision" onclick="proc.showSummaryModal(this.id,this.name);">Upload Provision</a></li>
                                    <li><a class="dropdown-item" href="#" id="${row.id}" name="generateExcel" onclick="proc.generateExcel(this.id);">Generate Excel</a></li>
                                    <li><a class="dropdown-item" href="#" id="${row.id}" name="showEditContract" onclick="proc.showEditContract(this.id);">Edit Contract</a></li>
                                <ul>
                        
                        </div>
                        `
                    }     
                }
            ],
            rowId: 'id',
            order: [1, 'DESC']
        }
            );
        },

        'fetchCity': function(){
            provCode = $("#province").val();
            provText = $("#province option:selected").text();
            $('#provinceText').val(provText)
            console.log(provCode);
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
				$("#city").html(option);
               
               })
               .catch(err =>{
                  console.log(err.response)
               }); 
        },

        'uploadContract': function(){
            // var formsData = $("#uploadContractModalFrm")[0];
            var action = $('#actionType').val();
            var formData = new FormData($("#uploadContractModalFrm")[0]);
            console.log('action is ' + action);

            if(action == 'summary'){
                axios.interceptors.request.use(config => {
                    // perform a task before the request is sent
                    console.log('2');
                    proc.load('.modal-content');
                    return config;
                    }, error => {
                    // handle the error
                    return Promise.reject(error);
                });
                axios.post('/saveContractDetail',formData)
                .then(res =>{
                    // console.log('3');
                    // console.log(JSON.stringify(this.lessors));
                    Swal.fire({
                        icon: 'success',
                        title: 'Contract Upload',
                        text: 'Contract Summary Succesfully uploaded',
                    });
                    $('#staticBackdrop').modal('hide');
                    proc.unload('.modal-content')
                    // $("#contract").val();
                    document.getElementById("contract").value = "";
                    location.reload(); 
                })
                .catch(err =>{
                    Swal.fire({
                    icon: 'error',
                    title: 'Upload Error Encountered',
                    text: 'Please Contact Web Administrator!',
                    });
                    proc.unload('.modal-content');
                    document.getElementById("contract").value = "";
                    $('#staticBackdrop').modal('hide');
                    console.log(err.response)
                }); 


            }
            if(action == 'pvcomp'){
                axios.interceptors.request.use(config => {
                    proc.load('.modal-content');
                    return config;
                    }, error => {
                    return Promise.reject(error);
                });
                axios.post('/saveContractPvcomp',formData)
                .then(res =>{
                    // console.log(res.data.record.monthStart);
                    if(res.data.message == "Uploaded records does not match previous records"){
                        var message = 'Month Start: ' + res.data.record.monthStart +  ' - ' + 'Month End: ' + res.data.record.monthEnd;
                        console.log(message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Uploaded records does not match previous records',
                            text:  message,
                            confirmButtonText: 'Ok i will check it!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                proc.uploadContractCleanup();
                            }
                        });
                    }else if(res.data.status){
                        Swal.fire({
                            icon: 'success',
                            title: res.data.message,
                            text: 'Upload Success',
                            confirmButtonText: 'Ok i will check it!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                proc.uploadContractCleanup();
                            }
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: res.data.message,
                            text: 'Upload Failed',
                            confirmButtonText: 'Ok i will check it!'
                         }).then((result) => {
                            if (result.isConfirmed) {
                                proc.uploadContractCleanup();
                            }
                        });
                    }
                }).catch(err =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Error Encountered',
                        text: 'Please Contact Web Administrator!',
                    });
                    proc.unload('.modal-content');
                    document.getElementById("contract").value = "";
                    $('#staticBackdrop').modal('hide');
                    console.log(err.response);
                }); 
            }

            if(action == 'provision'){
                axios.interceptors.request.use(config => {
                    proc.load('.modal-content');
                    return config;
                    }, error => {
                    return Promise.reject(error);
                });
                axios.post('/saveContractProvision',formData)
                .then(res =>{
                console.log(res.data);
                if(res.data == 'No Provisions specified in Header'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Error Encountered',
                        text: 'No Provisions specified in Header',
                    });
                    proc.uploadContractCleanup();
                }else if(res.data.error == 'no record'){
                    Swal.fire({
                    icon: 'error',
                    title: 'Upload Error Encountered',
                    text: res.data.message,
                    });
                    proc.uploadContractCleanup();
                }
                
                else{
                    Swal.fire({
                        icon: 'success',
                        title: 'Contract Upload',
                        text: 'Contract Provisions Succesfully uploaded',
                    });
                    proc.uploadContractCleanup();
                }
                    
                })
                .catch(err =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Error Encountered',
                        text: 'Please Contact Web Administrator!',
                    });
                    proc.unload('.modal-content')
                    $('#staticBackdrop').modal('hide');
                    document.getElementById("contract").value = "";
                    // proc.uploadContractCleanup();
                }); 
            }

            if(action == 'discount'){
                axios.interceptors.request.use(config => {
                    // perform a task before the request is sent
                    proc.load('.modal-content');
                    return config;
                    },
                    error => {
                    // handle the error
                    return Promise.reject(error);
                });
                axios.post('/saveContractDiscount',formData)
                .then(res =>{
                // console.log(JSON.stringify(this.lessors));
                    Swal.fire({
                        icon: 'success',
                        title: 'Contract Upload',
                        text: 'Contract Provisions Succesfully uploaded',
                    });
                    $('#staticBackdrop').modal('hide');
                    proc.unload('.modal-content');
                    document.getElementById("contract").value = "";
                    location.reload();
                })
                .catch(err =>{
                    Swal.fire({
                    icon: 'error',
                    title: 'Upload Error Encountered',
                    text: 'Please Contact Web Administrator!',
                    });
                    proc.unload('.modal-content');
                    document.getElementById("contract").value = "";
                    $('#staticBackdrop').modal('hide');
                    console.log(err.response)
                }); 
            }
         
        },

        'uploadContractCleanup': function(){
            proc.unload('.modal-content')
            $('#staticBackdrop').modal('hide');
            document.getElementById("contract").value = "";
            location.reload(); 
        },

        'clearInput': function(){
            $('#lessor').val('');
            $('#payee').val('');
            $('#address').val('');
            $('#province').val('');
            $('#city').val('');
            $('#store').val('');
            $('#subjectLease').val('');
            $('#escalationPercent').val('');
            $('#monthlyRent').val('');
            $('#area').val('');
            $('#securityDeposit').val('');
            $('#securityDepositAmount').val('');
            $('#advanceRent').val('');
            $('#advanceRentAmount').val('');
            $('#rentFreeStart').val('');
            $('#rentFreeEnd').val('');
            $('#contractPeriodStart').val('');
            $('#contractPeriodEnd').val('');
            $('#contractYear').val('');
            $('#provision').val([]);
             location.reload();
        },

        'generateExcel': function($id){
            window.open("/generateExcel?id="+$id);
        },
        'load': function(element) {
            // console.log('test');
            $(element).block({
                message: '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>',
                overlayCSS: {
                    opacity: 0.5,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 0px '
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none'
                }
            });
        },
        'unload':function(element) {
            window.setTimeout(function () {
                $(element).unblock();
            }, 200);
        },

        'showEditContract':function(id){
            window.location = '/showEditContract?headerID=' + id;
            // $('#editModalCenter').modal('show');
        },

        'editContract': function(){
            var formData = new FormData($("#editContractModalFrm")[0]);
            dd(formData);
            // console.log(formData);
            axios.interceptors.request.use(config => {
                    // perform a task before the request is sent
                    proc.load('.modal-content');
                    return config;
                    }, error => {
                    // handle the error
                    return Promise.reject(error);
                });
                axios.post('/editContract',formData)
               .then(res =>{
                    // console.log('3');
                    // console.log(JSON.stringify(this.lessors));
                    Swal.fire({
                        icon: 'success',
                        title: 'Contract Upload',
                        text: 'Contract Summary Succesfully uploaded',
                    });
                    $('#exampleModalCenter').modal('hide');
                    proc.unload('.modal-content')
                    location.reload(); 
               })
               .catch(err =>{
                console.log(err);
               }); 
        }
    
    }