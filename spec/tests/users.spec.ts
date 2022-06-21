import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';

import app from '@server';
import { User, UserRepository } from '@modules/users/domain';
import { getRandomString, pErr } from '@shared/functions';
import { ParamMissingError, UserNotFoundError } from '@shared/errors';
import { IdGenerator } from 'src/test/idGenerator';
import { container } from 'src/inversify.dependencies';

const userRepository = container.get<UserRepository>('UserRepository');

type TReqBody = string | object | undefined;


describe('user-router', () => {

  const usersPath = '/users';
  const getUserPath = `${ usersPath }/`;
  const addUsersPath = `${ usersPath }/`;

  const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  /***********************************************************************************
   *                                    Test Post
   **********************************************************************************/

  describe(`"POST:${ addUsersPath }"`, () => {

    const callApi = (reqBody: TReqBody) => {
      return agent.post(addUsersPath).type('form').send(reqBody);
    };

    it(`should return a status code of "${ CREATED }" if the request was successful.`, (done) => {
      const userData = {
        name: 'username',
        email: `${ getRandomString(10) }@gmail.com`,
        password: '123456'
      };

      callApi(userData)
        .end((err: Error, res: Response) => {
          expect(res.status).toBe(CREATED);
          expect(res.body).toEqual(
            jasmine.objectContaining({
              name: userData.name,
              email: userData.email,
              password: userData.password,
            })
          );
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`Returns ${ BAD_REQUEST } if some params are missing`, (done) => {
      callApi({})
        .end((err: Error, res: Response) => {
          expect(res.status).toBe(BAD_REQUEST);
          done();
        });
    });

    it(`Returns ${ BAD_REQUEST } if the user already exists`, async () => {
      const userData = {
        name: 'username',
        email: `${ getRandomString(10) }@gmail.com`,
        password: '123456'
      };

      await callApi(userData).then(() => {
        callApi(userData)
          .end((err: Error, res: Response) => {
            expect(res.status).toBe(BAD_REQUEST);
          });
      });


    });

  });

  describe(`"GET:${ addUsersPath }:userId"`, () => {

    const callApi = (userId: string) => {
      return agent.get(`${ getUserPath }${ userId }`);
    }

    const userData = {
      name: 'username',
      email: `${ getRandomString(10) }@gmail.com`,
      password: '123456'
    };

    it(`should return a status code of "${ OK }" if the request was successful.`, async () => {
      const response = await agent.post(addUsersPath).type('form').send(userData);

      callApi(response.body._id)
        .end((err: Error, res: Response) => {
          expect(res.status).toBe(OK);
          expect(res.body).toEqual(
            jasmine.objectContaining({
              name: userData.name,
              email: userData.email,
              password: userData.password,
            })
          );
          expect(res.body.error).toBeUndefined();
        });
    });

    it(`should return a status code of "${ NOT_FOUND }" if the user doesnt exists.`, () => {
      callApi(IdGenerator.generate())
        .end((err: Error, res: Response) => {
          expect(res.status).toBe(NOT_FOUND);
          expect(res.body).toEqual(null);
        });
    });

  });

});
