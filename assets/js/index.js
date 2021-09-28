

$('#add_user').submit(function(event){
    alert('Data Inserted Successfully!')
})


$('#update_user').submit(function(event){
    event.preventDefault();

    // 아래에서 this는 '#update_user'와 같음 
    let unindexed_array = $(this).serializeArray();
    let data = {}
    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })

    console.log('upindexed array=',unindexed_array);
    console.log(data);

    let request = {
        'url':`http://localhost:3000/api/users/${data.id}`,
        'method':'PUT',
        'data':data,
    }

    $.ajax(request).done(function(response){
        alert('Data updated successfully!')
    })

})

if(window.location.pathname=='/'){
    $ondelete = $('.table tbody td a.delete');
    $ondelete.click(function(){
        let id = $(this).attr('data-id')

        let request = {
            'url':`http://localhost:3000/api/users/${id}`,
            'method':'DELETE'
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert('Data deleted successfully!');
                location.reload();
            })
        }
    })
}