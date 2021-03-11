import React, { useState ,useEffect} from "react";

export default function ContactFrom(props) {
  const formAlanlar = {
    isim: "",
    soyisim: "",
    telefon: "",
    mail: "",
  };

  const [alanlar, setAlanlar] = useState(formAlanlar);

  useEffect(()=>{
    console.log(props.currentId);
    if(props.currentId === ''){
      setAlanlar({
        ...formAlanlar
      })
    }else{
      setAlanlar({
        ...props.iletisimVeriler[props.currentId]
      })
    }
  },[props.currentId,props.iletisimVeriler])

  const alanlarDegisti = (e) => {
    var alanIsim = e.target.name;
    var alanDeger = e.target.value;

    setAlanlar({
      ...alanlar,
      [alanIsim]: alanDeger,
    });
  };

  const verileriKaydet = (e) => {
    e.preventDefault();

    props.veriEkle(alanlar);
  };

  return (
    <form onSubmit={verileriKaydet}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          onChange={alanlarDegisti}
          className="form-control"
          placeholder="isim giriniz"
          type="text"
          name="isim"
          value={alanlar.isim || ''}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          onChange={alanlarDegisti}
          className="form-control"
          name="soyisim"
          placeholder="soyad giriniz"
          type="text"
          value={alanlar.soyisim || ''}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-phone"></i>
            </div>
          </div>
          <input
            onChange={alanlarDegisti}
            className="form-control"
            placeholder="Telefon giriniz"
            type="text"
            name="telefon"
            value={alanlar.telefon || ''}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope-square"></i>
            </div>
          </div>
          <input
            onChange={alanlarDegisti}
            className="form-control"
            placeholder="Mail giriniz"
            type="text"
            name="mail"
            value={alanlar.mail || ''}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Kaydet"
          className="btn btn-secondary btn-block"
        />
      </div>
    </form>
  );
}
