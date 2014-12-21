function UploadPhoto($upload, SetImagePreview, Manager) {
  var serv = this;

  this.call = function(photo, token) {
    SetImagePreview.call(photo);
    Manager.state = Manager.states.uploading;
    
    return $upload.upload({
      url: '/photos/',
      method: 'POST',
      data: {photo: photo, authenticity_token: token},
      file: photo, 
      fileFormDataName: "photo", 
      formDataAppender: function(formData) {
        formData.append("authenticity_token", token);
        formData.append("photo", photo);
      } 

    }).progress(function(evt) {
      console.log(evt);
    }).success(function(data, status, headers, config) {

      // file is uploaded successfully
      Manager.photo   = config.file;
      Manager.palette = data;

    });
    //.error(...)
    //.then(success, error, progress); // returns a promise that does NOT have progress/abort/xhr functions
    //.xhr(function(xhr){xhr.upload.addEventListener(...)}) // access or attach event listeners to the underlying XMLHttpRequest

  };


}

angular.module('colourMatch').service("UploadPhoto", ["$upload", "SetImagePreview", "Manager", UploadPhoto]);