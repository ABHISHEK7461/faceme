// Dropzone.autoDiscover = false;

// function init() {
//     let dz = new Dropzone("#dropzone", {
//         url: "/",
//         maxFiles: 1,
//         addRemoveLinks: true,
//         dictDefaultMessage: "Some Message",
//         autoProcessQueue: false
//     });
    
//     dz.on("addedfile", function() {
//         if (dz.files[1]!=null) {
//             dz.removeFile(dz.files[0]);        
//         }
//     });

//     dz.on("complete", function (file) {
//         let imageData = file.dataURL;
        
//         var url = "http://127.0.0.1:5000/classify_image";

//         $.post(url, {
//             image_data: file.dataURL
//         },function(data, status) {
//             /* 
//             Below is a sample response if you have two faces in an image lets say virat and roger together.
//             Most of the time if there is one person in the image you will get only one element in below array
//             data = [
//                 {
//                     class: "viral_kohli",
//                     class_probability: [1.05, 12.67, 22.00, 4.5, 91.56],
//                     class_dictionary: {
//                         lionel_messi: 0,
//                         maria_sharapova: 1,
//                         roger_federer: 2,
//                         serena_williams: 3,
//                         virat_kohli: 4
//                     }
//                 },
//                 {
//                     class: "roder_federer",
//                     class_probability: [7.02, 23.7, 52.00, 6.1, 1.62],
//                     class_dictionary: {
//                         lionel_messi: 0,
//                         maria_sharapova: 1,
//                         roger_federer: 2,
//                         serena_williams: 3,
//                         virat_kohli: 4
//                     }
//                 }
//             ]
//             */
//             console.log(data);
//             if (!data || data.length==0) {
//                 $("#resultHolder").hide();
//                 $("#divClassTable").hide();                
//                 $("#error").show();
//                 return;
//             }
//             let players = ["lionel_messi", "maria_sharapova", "roger_federer", "serena_williams", "virat_kohli"];
            
//             let match = null;
//             let bestScore = -1;
//             for (let i=0;i<data.length;++i) {
//                 let maxScoreForThisClass = Math.max(...data[i].class_probability);
//                 if(maxScoreForThisClass>bestScore) {
//                     match = data[i];
//                     bestScore = maxScoreForThisClass;
//                 }
//             }
//             if (match) {
//                 $("#error").hide();
//                 $("#resultHolder").show();
//                 $("#divClassTable").show();
//                 $("#resultHolder").html($(`[data-player="${match.class}"`).html());
//                 let classDictionary = match.class_dictionary;
//                 for(let personName in classDictionary) {
//                     let index = classDictionary[personName];
//                     let proabilityScore = match.class_probability[index];
//                     let elementName = "#score_" + personName;
//                     $(elementName).html(proabilityScore);
//                 }
//             }
//             // dz.removeFile(file);            
//         });
//     });

//     $("#submitBtn").on('click', function (e) {
//         dz.processQueue();		
//     });
// }

// $(document).ready(function() {
//     console.log( "ready!" );
//     $("#error").hide();
//     $("#resultHolder").hide();
//     $("#divClassTable").hide();

//     init();
// });


// Disable Dropzone's auto-discovery
Dropzone.autoDiscover = false;

function init() {
    // Initialize Dropzone with configuration
    let dz = new Dropzone("#dropzone", {
        url: "/", // No actual upload, placeholder URL
        maxFiles: 1, // Allow only one file
        addRemoveLinks: true, // Allow users to remove files
        dictDefaultMessage: "Drag and drop an image or click to upload.",
        autoProcessQueue: false, // Prevent automatic upload
    });

    // Event: Ensure only one file is uploaded at a time
    dz.on("addedfile", function () {
        if (dz.files.length > 1) {
            dz.removeFile(dz.files[0]); // Remove previous file
        }
    });

    // Event: Handle file completion (mocking backend response)
    dz.on("complete", function (file) {
        console.log("File added: ", file);

        // Simulated image data
        let imageData = file.dataURL;

        // Simulated backend response
        const mockResponse = [
            {
                class: "lionel_messi",
                class_probability: [90, 10, 5, 3, 2],
                class_dictionary: {
                    lionel_messi: 0,
                    maria_sharapova: 1,
                    roger_federer: 2,
                    serena_williams: 3,
                    virat_kohli: 4,
                },
            },
        ];

        // Process mock response (replace this with AJAX call for a real backend)
        processResponse(mockResponse);
    });

    // Button click event to process the upload
    $("#submitBtn").on("click", function () {
        dz.processQueue(); // Trigger Dropzone processing queue
    });
}

// Function to process backend (or mock) response
function processResponse(data) {
    // Check for valid response
    if (!data || data.length === 0) {
        $("#resultHolder").hide();
        $("#divClassTable").hide();
        $("#error").show(); // Show error message
        return;
    }

    // Hide error and show result sections
    $("#error").hide();
    $("#resultHolder").show();
    $("#divClassTable").show();

    // Find the best match from response data
    let bestMatch = data[0];
    let classDictionary = bestMatch.class_dictionary;

    // Update player details in the table
    for (let playerName in classDictionary) {
        let index = classDictionary[playerName];
        let probability = bestMatch.class_probability[index];
        $(`#score_${playerName}`).html(`${probability.toFixed(2)}%`);
    }

    // Show matched player's card
    $("#resultHolder").html($(`[data-player="${bestMatch.class}"]`).html());
}

$(document).ready(function () {
    // Hide error and result sections on page load
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    // Initialize Dropzone and events
    init();
});
