import database from "../config/Database.js";

export const ContactPostApi = (req, res) => {
  let data = req.body;
  console.log("here is body", data);
  res.send("Data Received: " + JSON.stringify(data));
  const { Name, Email, MobileNumber, ServiceName, Page } = req.body;
  const user = { Name, Email, MobileNumber, ServiceName, Page };
  database.query("INSERT INTO contact SET ?", user, (err, output) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      res.status({ msg: "User saved successfully!" });
    }
  });
};

export const ContactGetApi = (req, res) => {
  database.query("SELECT * FROM contact", function (err, result, fields) {
    return res.json(result);
  });
};

export const Register = (req, res) => {
  const { First_Name, Last_Name, Email, Password, Confirm_Password } = req.body;
  if (Password === Confirm_Password) {
    const user = { First_Name, Last_Name, Email, Password, Confirm_Password };
    database.query("INSERT INTO user SET ?", user, (err, output) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      } else {
        res.status(200).send({ message: "User saved successfully!" });
      }
    });
  } else {
    res.status(500).send({ message: "PassWord did not match" });
  }
};
export const HeadPostApi = (req, res) => {
  const { Page_Title, Meta_Name, Meta_Description, Page_Name } = req.body;
  const pageInfo = { Page_Title, Meta_Name, Meta_Description, Page_Name };
  database.query("INSERT INTO head SET ?", pageInfo, (err, output) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      res.status(200).send({ message: "Page Info added successfully!" });
    }
  });
};
export const HeadGetApi = (req, res) => {
  database.query(
    `SELECT * FROM head WHERE Page_Name = '${req.query.page}'`,
    function (err, result, fields) {
      if (result.length === 0) {
        res.status(500).send({ message: "No data found for this page" });
      } else {
        console.log("here is ress", result, req.query.page);
        return res.json(result);
      }
    }
  );
};
