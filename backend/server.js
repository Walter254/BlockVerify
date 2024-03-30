const express = require('express');
const app = express();
const PORT = 3001;
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const path = require('path');
const fs = require('fs');
const contractPath = path.resolve(__dirname, '..', 'build', 'contracts', 'ArticleRegister.json');
const { abi } = JSON.parse(fs.readFileSync(contractPath));
const contractAddress = 0xba34e4BC253Fb6c5F31E4ec70747F334F93A92A8; 
const articleRegister = new web3.eth.Contract(abi, contractAddress);
const stringSimilarity = require('string-similarity-js');
const mongoose = require('mongoose');
// Import NLTK and necessary resources
const nltk = require('nltk');
const bodyParser = require('body-parser');
nltk.download('punkt'); // Download tokenizer data
nltk.download('averaged_perceptron_tagger'); // Download part-of-speech tagger data

// Connect to MongoDB
mongoose.connect('mongodb+srv://wagudewalter2:wwowA2016@cluster0.ojn92qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now },
  });
  
  const Article = mongoose.model('Article', articleSchema);

// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('BlockVerify Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// app.post('/analyze', async (req, res) => {
//     res.json({ message: 'Endpoint hit successfully' });
//   });

// Route to handle article analysis
app.post('/analyze', async (req, res) => {
    try {

        console.log('Request received at /analyze endpoint'); 
      // Extract article content from request body
      const articleContent = req.body.content;
  
      // Perform NLTK analysis
      const tokens = nltk.word_tokenize(articleContent);
      const posTags = nltk.pos_tag(tokens);
      const entities = nltk.chunk.ne_chunk(posTags);
  
      // Analyze tone using NLTK sentiment analysis
      const sentimentScore = nltk.sentiment.analyze(articleContent);
  
      // Identify polarization using NLTK sentiment analysis
      const polarization = sentimentScore > 0 ? 'Positive' : (sentimentScore < 0 ? 'Negative' : 'Neutral');
  
    //   // Detect changes to the original article using NLTK diff library
    //   let originalArticle = '';
    //   let similarityScore = 0;
    //   articles.forEach(article => {
    //     const currentSimilarity = stringSimilarity.compareTwoStrings(article.content, articleContent);
    //     if (currentSimilarity > similarityScore) {
    //       similarityScore = currentSimilarity;
    //       originalArticle = article;
    //     }
    //   });
    //   const articleDiff = nltk.diff.diff(originalArticle.content, articleContent);

    //   // Save the current article to the database
    //   const newArticle = new Article({ content: articleContent });
    //   await newArticle.save();

    const articleDiff = null;

    // Since there's no original article to compare with, set originalArticleId to null
    const originalArticleId = null;
  
      // Identify potential misinformation using NLTK named entity recognition
      const misinformationEntities = entities.filter(entity => entity.label() === 'ORGANIZATION');
  
      // Prepare analysis results
      const analysisResults = {
        tokens,
        posTags,
        entities,
        sentimentScore,
        polarization,
        articleDiff,
        originalArticleId,
        misinformationEntities
      };
  
      // Return analysis results as JSON
      res.json(analysisResults);
    } catch (error) {
      console.error('Error analyzing article:', error);
      res.status(500).json({ error: 'An error occurred while analyzing the article' });
    }
  });

app.post('/registerArticle', async (req, res) => {
    const { hash, metadata } = req.body;
    const accounts = await web3.eth.getAccounts();
    
    try {
      const receipt = await articleRegister.methods.registerArticle(hash, metadata).send({ from: accounts[0] });
      res.json({ success: true, receipt });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  });
  
app.use(bodyParser.json());

// Route to retrieve all articles
app.get('/articles', async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      console.error('Error retrieving articles:', error);
      res.status(500).json({ error: 'An error occurred while retrieving articles' });
    }
  });
  
  // Route to retrieve a specific article by ID
app.get('/articles/:id', async (req, res) => {
try {
    const article = await Article.findById(req.params.id);
    if (!article) {
    return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
} catch (error) {
    console.error('Error retrieving article:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the article' });
}
});

