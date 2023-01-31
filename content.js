chrome.contextMenus.create({
    title: "Generate Cover Letter",
    contexts: ["selection"],
    onclick: function() {
        chrome.storage.local.get(['resumeText', 'jobDescription'], function(result) {
            const resumeText = result.resumeText;
            const jobDescription = result.jobDescription;
            if (!resumeText) {
                alert('Please save your resume text in the popup first!');
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.openai.com/v1/engines/davinci/completions');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        const generatedCoverLetter = response.choices[0].text;
                        chrome.tabs.create({ url: 'newtab.html' });
                    } else {
                        console.error('Error generating cover letter:', xhr.statusText);
                    }
                }
            };
            const requestData = {
                prompt: `Dear Hiring Manager,\n\nI am writing to apply for the ${jobDescription} position.\n\n${resumeText}\n\nSincerely,\n[Your Name]`,
                max_tokens: 1000,
                n: 1,
                stop: null,
                temperature: 0.5
            };
            xhr.send(JSON.stringify(requestData));
        });
    }
});
