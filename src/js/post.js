$(function() {
  
  const URL = 'https://script.google.com/macros/s/AKfycbz29VYj923WNGUpyzudyAnRuDz09QdLc2HAvMvtD3hC4d04E7I/exec';

  $('#loadData').click(function() {
    $.getJSON(URL, function(data) {
      console.log(data);
      let html = '';
      $.each(data, function(key, val) {
        console.log(val);
        // deconstruct array vals
        var first,last,company,group,title;
        [first,last,company,group,title,email] = val;
        html += `
          <li class="col-md-4 col-sm-6">
            <div class="card card-body mb-4">
              <h4>${first} ${last}</h4>
              <p><strong>${title}</strong></p>
              <ul class="list-unstyled">
                <li><a href="mailto:${email}">${email}</a></li>
                <li>${company}</li>
                <li>${group}</li>
              </ul>
            </div>
          </li>
        `;
      });
      $('#output').html(html);
    });
  });

});