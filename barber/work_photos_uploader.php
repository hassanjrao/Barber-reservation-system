<?php 

    if(isset($_POST['submit-work-photos'])){
        
        $uploadsDir = "../images/work_photos/";
        $allowedFileType = array('jpg','png','jpeg');
        
        // Velidate if files exist
        if (!empty(array_filter($_FILES['fileUpload']['name']))) {
            
            // Loop through file items
            foreach($_FILES['fileUpload']['name'] as $id=>$val){
                // Get files upload path
                $fileName        = $email . "_" . $_FILES['fileUpload']['name'][$id];
                $tempLocation    = $_FILES['fileUpload']['tmp_name'][$id];
                $targetFilePath  = $uploadsDir . $fileName;
                $fileType        = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
                $uploadDate      = date('Y-m-d H:i:s');
                $uploadOk = 1;
                $uploaded = false;
                
                if(in_array($fileType, $allowedFileType)){
                    $getWorkPhotos = $DB->query("SELECT * FROM workphotos WHERE photo=?", array($fileName));
                    if($getWorkPhotos == null){
                        if(move_uploaded_file($tempLocation, $targetFilePath)){
                            // $sqlVal = "('".$fileName."', '".$uploadDate."')";
                                $uploadWorkPhotos = $DB->query("INSERT INTO `workphotos`(`photo`, `userid`) VALUES (?,?)", array($fileName, $userId));//Parameters must be ordered
                        } else {
                            echo "File coud not be uploaded.";
                        }
                    }
                } else {
                    echo "Only .jpg, .jpeg and .png file formats allowed.";
                }
            }

        } else {
            // Error
            echo "Please select a file to upload.";
        }
    } 
?>