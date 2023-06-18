const userDao = require('../models/userDao')
const axios = require('axios');
const jwt = require('jsonwebtoken');

const signInKakao = async (kakaoToken) => {
    const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoToken}`,
      },

    });
    if (result.status !== 200) {
      throw new Error('INVALID_KAKAO_TOKEN', 401);
    }
    const { data } = result;

    const kakaoId = data.id;
    const email = data.kakao_account.email;

    let user = await userDao.getUserByKakaoId(kakaoId);
    
    if (!user) {
      user = await userDao.createUser(kakaoId, email);
    }
  
    const payLoad = { id: user.id };
  
    const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET);
    return { accessToken: accessToken };
  };
  
  const getUserById = async (userId) => {
    return await userDao.getUserById(userId);
  };

module.exports = {
    signInKakao,
    getUserById
  }