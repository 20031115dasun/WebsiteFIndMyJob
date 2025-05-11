window.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
      let scrollPosition = window.scrollY;

      let mountainsBehind = document.getElementById('mountains_behind');
      let mountainsFront = document.getElementById('mountains_front');
      let text = document.getElementById('text');

      mountainsBehind.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      text.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.7}px))`;
      mountainsFront.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  loadJobListings(); // Load job listings on page load

  document.getElementById('searchBar').addEventListener('submit', function(event) {
      event.preventDefault();
      searchJobListings();
  });

  function loadJobListings() {
      fetch('job.xml')
          .then(response => response.text())
          .then(data => {
              const parser = new DOMParser();
              const xml = parser.parseFromString(data, "application/xml");
              console.log("Loaded XML Data:", data); // Log the raw XML data
              displayJobListings(xml);
          })
          .catch(error => console.error('Error loading XML:', error));
  }

  function displayJobListings(xml) {
      const jobs = xml.getElementsByTagName('job');
      const jobListings = document.getElementById('jobListings');
      jobListings.innerHTML = '';

      console.log(`Number of jobs found: ${jobs.length}`); // Log the number of jobs found

      for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          const title = job.getElementsByTagName('title')[0].textContent;
          const company = job.getElementsByTagName('company')[0].textContent;
          const location = job.getElementsByTagName('location')[0].textContent;
          const datePosted = job.getElementsByTagName('datePosted')[0].textContent;
          const description = job.getElementsByTagName('description')[0].textContent;
          const salary = job.getElementsByTagName('salary')[0].textContent;
          const experience = job.getElementsByTagName('experience')[0]?.textContent || 'Not specified';
          const jobType = job.getElementsByTagName('jobType')[0]?.textContent || 'Not specified';
          const requirements = job.getElementsByTagName('requirements')[0]?.textContent || 'Not specified';
          const applyLink = job.getElementsByTagName('applyLink')[0]?.textContent || '#';

          console.log(`Job ${i+1}: Title: ${title}, Company: ${company}, Location: ${location}`); // Log each job's basic info

          const jobListing = document.createElement('div');
          jobListing.className = 'job-listing';
          jobListing.innerHTML = `
              <div class="job-title">${title}</div>
              <div class="job-details">
                  <span><strong>Company:</strong> ${company}</span>
                  <span><strong>Location:</strong> ${location}</span>
                  <span><strong>Date Posted:</strong> ${datePosted}</span>
                  <span><strong>Description:</strong> ${description}</span>
                  <span><strong>Salary:</strong> ${salary}</span>
                  <span><strong>Experience:</strong> ${experience}</span>
                  <span><strong>Job Type:</strong> ${jobType}</span>
                  <span><strong>Requirements:</strong> ${requirements}</span>
                  <span><a href="${applyLink}" target="_blank">Apply Here</a></span>
              </div>
              <button class="save-button">Save</button>
          `;
          jobListings.appendChild(jobListing);
      }
  }

  function searchJobListings() {
      const keyword = document.getElementById('keyword').value.toLowerCase();
      const location = document.getElementById('location').value.toLowerCase();
      const category = document.getElementById('category').value.toLowerCase();

      fetch('jobs.xml')
          .then(response => response.text())
          .then(data => {
              const parser = new DOMParser();
              const xml = parser.parseFromString(data, "application/xml");
              const jobs = xml.getElementsByTagName('job');

              const jobListings = document.getElementById('jobListings');
              jobListings.innerHTML = ''; 

              for (let job of jobs) {
                  const title = job.getElementsByTagName('title')[0].textContent.toLowerCase();
                  const company = job.getElementsByTagName('company')[0].textContent.toLowerCase();
                  const jobLocation = job.getElementsByTagName('location')[0].textContent.toLowerCase();

                  if ((title.includes(keyword) || company.includes(keyword)) &&
                      (location === '' || jobLocation.includes(location)) &&
                      (category === '' || title.includes(category))) {

                      const jobListing = document.createElement('div');
                      jobListing.className = 'job-listing';
                      jobListing.innerHTML = `
                          <div class="job-title">${job.getElementsByTagName('title')[0].textContent}</div>
                          <div class="job-details">
                              <span><strong>Company:</strong> ${job.getElementsByTagName('company')[0].textContent}</span>
                              <span><strong>Location:</strong> ${job.getElementsByTagName('location')[0].textContent}</span>
                              <span><strong>Date Posted:</strong> ${job.getElementsByTagName('datePosted')[0].textContent}</span>
                              <span><strong>Description:</strong> ${job.getElementsByTagName('description')[0].textContent}</span>
                              <span><strong>Salary:</strong> ${job.getElementsByTagName('salary')[0].textContent}</span>
                              <span><strong>Experience:</strong> ${job.getElementsByTagName('experience')[0]?.textContent || 'Not specified'}</span>
                              <span><strong>Job Type:</strong> ${job.getElementsByTagName('jobType')[0]?.textContent || 'Not specified'}</span>
                              <span><strong>Requirements:</strong> ${job.getElementsByTagName('requirements')[0]?.textContent || 'Not specified'}</span>
                              <span><a href="${job.getElementsByTagName('applyLink')[0]?.textContent || '#'}" target="_blank">Apply Here</a></span>
                          </div>
                          <button class="save-button">Save</button>
                      `;
                      jobListings.appendChild(jobListing);
                  }
              }
          })
          .catch(error => console.error('Error loading XML:', error));
  }
});
