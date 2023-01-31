document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('saveBtn');
    const resumeText = document.getElementById('resumeText');
    if (typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined') {
        saveBtn.addEventListener('click', function() {
          chrome.storage.local.set({'resumeText': resumeText.value}, function() {
            console.log('Resume text saved successfully');
          });
        });
      
        chrome.storage.local.get('resumeText', function(data) {
          if (chrome.runtime.lastError) {
            console.error('Error retrieving resume text:', chrome.runtime.lastError.message);
          } else {
            resumeText.value = data.resumeText || '';
          }
        });
      } else {
        console.error('Error: chrome object or chrome.storage object not defined');
      }
    });      