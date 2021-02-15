const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const { verify, getToken } = require('../../helpers/token');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');
const config = require('../../project.config');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/upload'
});

router.post('/file', async (ctx) => {
  const ext = getUploadFileExt(ctx);
  const filename = `${uuidv4()}.${ext}`;
  const dir = await saveFileToDisk(ctx, path.resolve(config.UPLOAD_DIR, filename));

  ctx.body = {
    data: filename,
    msg: 'ok',
    code: 1
  }
});




module.exports = router;