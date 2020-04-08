$(function() {
  
  const URL = 'https://spreadsheets.google.com/feeds/list/1MEqxziWKAEWOdpAuy-ksEtN0F0SnGY5ldzLeWzPVc-4/od6/public/values?alt=json'

  $('#loadData').click(function() {
    $.getJSON(URL, function(data) {
      let html = '';
      $.each(data.feed.entry, function(key, val) {
        console.log(val);
        console.log(val.gsx$company.$t);
        console.log(val.gsx$first.$t + ' ' + val.gsx$last.$t);
        html += `
          <div class="col-md-4">
            <div class="card card-body mb-4">
              <h4>${val.gsx$first.$t} ${val.gsx$last.$t}</h4>
              <p><strong>${val.gsx$title.$t}</strong></p>
              <ul class="list-unstyled">
                <li>${val.gsx$company.$t}</li>
                <li>${val.gsx$group.$t}</li>
              </ul>
            </div>
          </div>
        `;
      });
      $('#output').html(html);
    });
  });

});