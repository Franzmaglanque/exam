window.addEventListener("load", (event) => {
    proc.fetchContracts();
});

$('#uploadContractButton').on('click',function(){
    proc.uploadContract();
});

var proc = {

	'fetchContracts': function(){
            $('#contractTbl').DataTable(
            {
            destroy: true,
            ajax: {
                type: 'POST',
                dataType: 'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                url: '/contracts',
                dataSrc: 'data',
            },
            drawCallback: function () {
                // addDisable('#voidBtn');
            },
            serverSide: true,
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
						<div class="list-icons list-icons-extended">
										<a href="#" class="list-icons-item" onclick="proc.showContractDetails(${row.id})"><i class="icon-file-eye"></i></a>
										<div class="list-icons-item dropdown">
											<a href="#" class="list-icons-item dropdown-toggle" data-toggle="dropdown"><i class="icon-file-text2"></i></a>
											<div class="dropdown-menu dropdown-menu-right">
												<a class="dropdown-item" href="#" id="${row.id}" name="summary" onclick="proc.showSummaryModal(this.id,this.name);">Upload Summary</a>
												<a class="dropdown-item" href="#" id="${row.id}" name="pvcomp" onclick="proc.showSummaryModal(this.id,this.name);">Upload PVCOMP</a>
												<a class="dropdown-item" href="#" id="${row.id}" name="provision" onclick="proc.showSummaryModal(this.id,this.name);">Upload Provision</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item" id="${row.id}" name="showEditContract" onclick="proc.showEditContract(this.id);"><i class="icon-file-plus"></i> Edit</a>
												<a class="dropdown-item" href="#" id="${row.id}" name="generateExcel" onclick="proc.generateExcel(this.id);">Generate Excel</a>
											</div>
										</div>
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

		'showContractDetails': function(id){

			$.ajax({
				type: 'POST',
				data: {'headerID':id},
				url: '/viewContractDetails',
				headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
				beforeSend: function () {
					// load('.upload_modal');
				},
				error: function (xhr) {
					
				},
				success: function (data) {
					// eval(data);
					console.log(data);
					$('#invoice').modal('show');
				},
				complete: function(){}
		});
		
		// axios.post('/viewContractDetails',{'headerID':id})
        //     .then(res =>{
        //         // Swal.fire({
        //         // title: 'Success!',
        //         // text: 'You have successfully created Contract',
        //         // icon: 'success',
        //         // confirmButtonText: 'Cool'
        //         // });
        //         // this.clearInput();
		// 		console.log(res);
        //     // console.log(JSON.stringify(this.lessors));
        //     })
        //     .catch(err =>{
        //         console.log(err.response)
        //     }); 
		},

        'showSummaryModal': function(id,name){
            console.log(id);
            $('#contractID').val(id);
            $('#actionType').val(name);
            $('#upload_modal').modal('show');
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
                    proc.unload('.upload_modal')
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
                    proc.unload('.upload_modal');
                    document.getElementById("contract").value = "";
                    $('#staticBackdrop').modal('hide');
                    console.log(err.response)
                }); 


            }
            if(action == 'pvcomp'){
                axios.interceptors.request.use(config => {
                    proc.load('.upload_modal');
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
                    proc.unload('.upload_modal');
                    document.getElementById("contract").value = "";
                    $('#staticBackdrop').modal('hide');
                    console.log(err.response);
                }); 
            }

            if(action == 'provision'){
                axios.interceptors.request.use(config => {
                    proc.load('.upload_modal');
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
                    proc.unload('.upload_modal')
                    $('#staticBackdrop').modal('hide');
                    document.getElementById("contract").value = "";
                    // proc.uploadContractCleanup();
                }); 
            }

            if(action == 'discount'){
                axios.interceptors.request.use(config => {
                    // perform a task before the request is sent
                    proc.load('.upload_modal');
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
                    proc.unload('.upload_modal');
                    document.getElementById("contract").value = "";
                    location.reload();
                })
                .catch(err =>{
                    Swal.fire({
                    icon: 'error',
                    title: 'Upload Error Encountered',
                    text: 'Please Contact Web Administrator!',
                    });
                    proc.unload('.upload_modal');
                    document.getElementById("contract").value = "";
                    $('#staticBackdrop').modal('hide');
                    console.log(err.response)
                }); 
            }
         
        },

        'uploadContractCleanup': function(){
            proc.unload('.upload_modal')
            $('#upload_modal').modal('hide');
            document.getElementById("contract").value = "";
            location.reload(); 
        },

        'load': function(element) {
            // console.log('test');

            $(element).block({
                // message: '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>',
                message: '<span class="text-semibold"><i class="icon-spinner9 spinner" style="font-size:30px;"></i>&nbsp;' + ' please wait.</span>',
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

        'blockPage': function(msg){
            $.blockUI({ 
                message: '<span class="text-semibold"><i class="icon-spinner9 spinner" style="font-size:30px;"></i>&nbsp; '+msg+', please wait.</span>',
                //timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#1b2024',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    color: '#fff',
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        },

        'showEditContract':function(id){
            window.location = '/showEditContract?headerID=' + id;
            // $('#editModalCenter').modal('show');
        },
}