import React, { useState, useEffect } from "react";
import ContactFrom from "./ContactFrom";
import firebaseDB from "../Firebase";

export default function Contact() {
  const [iletisimVeriler, setIletisimVeriler] = useState({});
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDB.child("iletişim").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setIletisimVeriler({
          ...snapshot.val(),
        });
      }
      console.log(snapshot.val());
    });
  }, []);

  const veriEkle = (nesne) => {
    //console.log(nesne);
    if (currentId === "") {
      firebaseDB.child("iletişim").push(nesne, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      firebaseDB.child(`iletişim/${currentId}`).set(nesne, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  const veriSil = (id) => {
    if (window.confirm("Are you sure ?")) {
      firebaseDB.child(`iletişim/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };

  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">İletişim Bilgileri Giriş Sayfası</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactFrom {...{ veriEkle, currentId, iletisimVeriler }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Isim Soyisim</th>
                <th>Mail</th>
                <th>Telefon</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(iletisimVeriler).map((id) => {
                return (
                  <tr key={id}>
                    <td>
                      {iletisimVeriler[id].isim} {iletisimVeriler[id].soyisim}
                    </td>
                    <td>{iletisimVeriler[id].mail}</td>
                    <td>{iletisimVeriler[id].telefon}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => setCurrentId(id)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a className="btn text-danger" onClick={()=>veriSil(id)}>
                        <i className="fas fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
