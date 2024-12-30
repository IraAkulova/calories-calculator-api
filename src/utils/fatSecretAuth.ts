import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { FATSECRET_OAUTH_URL } from './constants';

const saveTokenToEnv = (token: string, expiresIn: string): void => {
  const envFilePath = path.resolve(__dirname, '../../.env');
  const tokenEnvVariable = `FATSECRET_ACCESS_TOKEN=${token}`;
  const expiresInEnvVariable = `FATSECRET_TOKEN_EXPIRES_IN=${expiresIn}`;

  try {
    let envContent = '';
    if (fs.existsSync(envFilePath)) {
      envContent = fs.readFileSync(envFilePath, 'utf8');
    }

    if (envContent.includes('FATSECRET_ACCESS_TOKEN=')) {
      envContent = envContent.replace(
        /FATSECRET_ACCESS_TOKEN=.*/,
        tokenEnvVariable,
      );
    } else {
      envContent += `\n${tokenEnvVariable}`;
    }

    if (envContent.includes('FATSECRET_TOKEN_EXPIRES_IN=')) {
      envContent = envContent.replace(
        /FATSECRET_TOKEN_EXPIRES_IN=.*/,
        expiresInEnvVariable,
      );
    } else {
      envContent += `\n${expiresInEnvVariable}`;
    }

    fs.writeFileSync(envFilePath, envContent, 'utf8');
  } catch (error) {
    console.error(
      'Failed to save access token and expiration to .env file:',
      error.message,
    );
    throw new InternalServerErrorException('Error saving token to .env file');
  }
};

const getAccessToken = async (): Promise<string> => {
  const clientID = process.env.FATSECRET_CLIENT_ID;
  const clientSecret = process.env.FATSECRET_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    throw new InternalServerErrorException('FatSecret credentials are missing');
  }

  try {
    const response = await axios.post(
      FATSECRET_OAUTH_URL,
      'grant_type=client_credentials&scope=basic',
      {
        auth: {
          username: clientID,
          password: clientSecret,
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;

    // Save the token to the .env file
    saveTokenToEnv(token, expiresIn);

    return token;
  } catch (error) {
    console.error('Error getting FatSecret access token:', error.message);
    throw new InternalServerErrorException('Failed to fetch access token');
  }
};

const isTokenExpired = (): boolean => {
  const envFilePath = path.resolve(__dirname, '../../.env');

  try {
    if (!fs.existsSync(envFilePath)) {
      throw new Error('.env file not found');
    }

    const envContent = fs.readFileSync(envFilePath, 'utf8');

    const tokenExpiryMatch = envContent.match(
      /FATSECRET_TOKEN_EXPIRES_IN=(\d+)/,
    );

    if (!tokenExpiryMatch) {
      throw new Error('Token expiration time not found in .env file');
    }

    const expiresIn = parseInt(tokenExpiryMatch[1], 10);
    const tokenTimestamp = Date.now();

    return tokenTimestamp >= expiresIn;
  } catch (error) {
    console.error('Error checking token expiration:', error.message);
    return true;
  }
};

export { getAccessToken, isTokenExpired };
