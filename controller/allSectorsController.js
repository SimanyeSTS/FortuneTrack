import express from 'express'
import { AllSectors } from '../model/AllSectors.js'

const allSectorsRouter = express.Router()

allSectorsRouter.get('/', async (req, res) => {
  try {
    const sectors = await AllSectors.getAll()
    res.json({
      status: 200,
      results: sectors,
      message: sectors.length === 0 ? 'No sectors found' : '',
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      results: [],
      message: 'Error fetching sectors',
    })
  }
})

export { 
  allSectorsRouter 
}