import app from './src/app.js'
import 'dotenv/config'
import connectDB from './src/db/db.config.js'

const PORT = process.env.PORT || 3000;

(async () => {
	try {
		await connectDB();
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
})();