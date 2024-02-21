import jwt from 'jsonwebtoken';

const token = jwt.sign({ myPayloadData: 9999 }, 'mysecretkey');
console.log(token);

const decoededValue = jwt.decode(token);
console.log(decoededValue);

const decodedValueByVerify = jwt.verify(token, 'mysecdretkey');
console.log(decodedValueByVerify);
