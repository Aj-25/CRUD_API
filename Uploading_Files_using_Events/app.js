const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const app = express();

app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
