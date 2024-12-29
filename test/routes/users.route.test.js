const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../app'); // Asegúrate de que esta sea la instancia de tu aplicación
const { userPremium, getUsers, getPorudctsByUid, changeImageProfile, uploadDocuments, deleteUser, deleteAllUsersInactive } = require('../controllers/user.controller');
const uploader = require('../middlewares/multer');

const { expect } = chai;

describe('User Routes', () => {
  let userControllerStub;

  beforeEach(() => {
    userControllerStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore(); // Limpiar todos los stubs después de cada prueba
  });

  describe('GET /premium/:uid', () => {
    it('should return status 200 if the user is premium', async () => {
      const uid = '12345';
      // Stub de la función userPremium
      sinon.stub(userPremium, 'call').resolves();

      const res = await request(app)
        .get(`/premium/${uid}`)
        .set('Authorization', 'Bearer someToken'); // Si necesitas autenticación

      expect(res.status).to.equal(200);
      expect(userPremium.calledOnce).to.be.true; // Verifica que la función se haya llamado
    });
  });

  describe('GET /', () => {
    it('should return all users', async () => {
      sinon.stub(getUsers, 'call').resolves([{ name: 'User1' }, { name: 'User2' }]);

      const res = await request(app)
        .get('/')
        .set('Authorization', 'Bearer someToken');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf(2);
      expect(getUsers.calledOnce).to.be.true;
    });
  });

  describe('GET /:uid/products', () => {
    it('should return products for the given user', async () => {
      const uid = '12345';
      sinon.stub(getPorudctsByUid, 'call').resolves([{ name: 'Product1' }, { name: 'Product2' }]);

      const res = await request(app)
        .get(`/${uid}/products`)
        .set('Authorization', 'Bearer someToken');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf(2);
      expect(getPorudctsByUid.calledOnce).to.be.true;
    });
  });

  describe('POST /imageProfile', () => {
    it('should change the profile image', async () => {
      const req = { file: 'imageFile' }; // Mock del archivo
      sinon.stub(changeImageProfile, 'call').resolves();

      const res = await request(app)
        .post('/imageProfile')
        .attach('profile', 'path/to/file.jpg')
        .set('Authorization', 'Bearer someToken');

      expect(res.status).to.equal(200);
      expect(changeImageProfile.calledOnce).to.be.true;
    });
  });

  describe('POST /:uid/documents', () => {
    it('should upload documents', async () => {
      const uid = '12345';
      const files = {
        identification: 'idFile',
        address: 'addressFile',
        statusaccount: 'statusFile',
        profile: 'profileFile'
      };
      sinon.stub(uploadDocuments, 'call').resolves();

      const res = await request(app)
        .post(`/${uid}/documents`)
        .attach('identification', files.identification)
        .attach('address', files.address)
        .attach('statusaccount', files.statusaccount)
        .attach('profile', files.profile)
        .set('Authorization', 'Bearer someToken');

      expect(res.status).to.equal(200);
      expect(uploadDocuments.calledOnce).to.be.true;
    });
  });

  describe('DELETE /:uid', () => {
    it('should delete a user', async () => {
      const uid = '12345';
      sinon.stub(deleteUser, 'call').resolves();

      const res = await request(app)
        .delete(`/${uid}`)
        .set('Authorization', 'Bearer someToken');

      expect(res.status).to.equal(200);
      expect(deleteUser.calledOnce).to.be.true;
    });
  });

  describe('DELETE /', () => {
    it('should delete all inactive users', async () => {
      sinon.stub(deleteAllUsersInactive, 'call').resolves();

      const res = await request(app)
        .delete('/')
        .set('Authorization', 'Bearer someToken');

      expect(res.status).to.equal(200);
      expect(deleteAllUsersInactive.calledOnce).to.be.true;
    });
  });
});
