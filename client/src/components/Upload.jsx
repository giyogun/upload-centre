import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import axios from "axios";
import toast from "react-hot-toast";

const URL = 'http://upload-centre.herokuapp.com'

const useStyles = makeStyles({
  wrapper: {
    background: "linear-gradient(to bottom right, #ccc, #eee)",
    marginTop: "4em",
    textAlign: "center",
    padding: "1em",
    borderRadius: "4px",
  },
  btn: {
    background: "#00008B",
    color: "white",
    fontSize: "2.4rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    padding: "1em 2.4em",
    boxShadow: "0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.466)",
    "&:hover": {
      background: "#00519B",
      transform: "translateY(-0.25rem)",
      boxShadow: "0.45rem 0.45rem 0.45rem rgba(153, 153, 153, 0.651)",
    },
  },

});
const Upload = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);

  const handleFile = ([file]) => file && setFile(file);
  const handleDelete = () => setFile(null);
  const handleSubmit = ([file]) => {
    const fd = new FormData();
    fd.append("file", file, file.name);
    axios
      .post(`${URL}/api/file/upload`, fd)
      .then(({ data }) => {
        setFileId(data);
        setFile(null);
        setShow(false);
        toast.success("file successfully uploaded!")
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log("db error");
          alert("db error");
        } else {
          console.log("other error");
        }
        setShow(false);
      });
  };
  return (
    <div className={classes.wrapper}>
      
      <Button className={classes.btn} onClick={() => setShow(true)}>
        Upload your file
      </Button>
      <DropzoneDialog
        open={show}
        onChange={handleFile}
        onClose={() => setShow(false)}
        onDelete={handleDelete}
        acceptedFiles={["image/jpeg", "image/png", "application/pdf"]}
        maxFileSize={5000000}
        filesLimit={1}
        showFileNamesInPreview={false}
        showFileNames={false}
        dropzoneText={"Drop it here"}
        getFileAddedMessage={() => "file added!"}
        getFileRemovedMessage={() => "file removed!"}
        onAlert={(alert) => console.log({ alert })}
        getFileLimitExceedMessage={() => "file is too big"}
        getDropRejectMessage={(file) => {
          if (file.size > 5000000) return "file is too big";
          else return "invalid file type";
        }}
        onSave={handleSubmit}
      />
    </div>
  );
};

export default Upload;
