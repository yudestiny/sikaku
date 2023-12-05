import Add from '@mui/icons-material/Add'
import { Box, Fab, Tooltip } from '@mui/material'
import React from 'react'

const PostButton = () => {
  return (
      <Box sx={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 5,
      }}>
        <Tooltip title="新規投稿">
          <Fab style={{background: "#1976d2", color: "white"}}>
            <Add />
          </Fab>
        </Tooltip>
      </Box>
  )
}

export default PostButton
