$(document).ready(function () {
  function abbreviate(state) {
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
    $.each(states, function(index, abbrev) {
      if (state === abbrev[0].toLowerCase()) {
        return abbrev[1];
      }
    });
  }
  $.ajax({
    url: 'https://randomuser.me/api/?inc=picture,name,email,location,cell,dob&results=12&nat=us&noinfo',
    dataType: 'json',
    success: function(data) {
      //HTML goes here
      let grid = "";
      $.each(data.results, function(index, employee) {
        const imageURL = employee.picture.medium;
        const name = employee.name.first + " " + employee.name.last;
        const email = employee.email;
        const city = employee.location.city;
        grid += `<div class="card" href="#modal" data-index="${index}">
                  <img class="profile" src="${imageURL}">
                  <span class="name">${name}</span>
                  <span class="email">${email}</span>
                  <span class="city">${city}</span>
                 </div>`
      });

      $('.employees').html(grid);

      $('.card').click(function() {
        //get employee object
        const employeeNumber = $(this).attr('data-index');
        const employee = data.results[employeeNumber];

        const imageURL = employee.picture.large;
        const name = employee.name.first + " " + employee.name.last;
        const email = employee.email;
        const cell = employee.cell;
        const street = employee.location.street;
        const city = employee.location.city;
        const state = employee.location.state;
        const postcode = employee.location.postcode;
        const birthyear = employee.dob.slice(0,4);
        const birthmonth = employee.dob.slice(5,7);
        const birthday = employee.dob.slice(8, 10);

        //update modal content
        let modal = `<img class="profile" src="${imageURL}">
                  <span class="name">${name}</span>
                  <span class="email">${email}</span>
                  <span class="city">${city}</span>
                  <span class="cell">${cell}</span>
                  <span class="address">${street}, ${city}, ${state} ${postcode}</span>
                  <span class="birthdate">Birthday: ${birthmonth}/${birthday}/${birthyear}</span>
                  `;
        $('#modal').html(modal).show();
      }); //end click
      //setup modal
      $('.card').leanModal({ top : 200, overlay : 0.4, closeButton: ".modal_close" });

    } //end callback
  }); //end ajax call
  $('form').submit(function(event) {
    //This is what happens when you submit the form
    event.preventDefault();
    console.log('Form submitted');
  });
}); //end ready
