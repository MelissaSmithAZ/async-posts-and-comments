// Calling for the posts
axios
  .get(`https://jsonplaceholder.typicode.com/posts`)

  // resolving the response from the api call to get posts
  .then(postsResponse => {
    // storing the posts in a variable
    let posts = postsResponse.data

    // calling for the comments
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)

      // resolving the comments promise
      .then(commentsResponse => {
        // storing the comments in a variable
        let comments = commentsResponse.data

        // locating the entry point to the html
        let entryPoint = document.getElementById('app')

        // iterating through the posts to correlate the posts and the comments, as well
        // as add the DOM stuff
        posts.forEach(post => {
          // Creating a new property on the post object called "comments"
          // The comments are being filtered through and filtering for post ids that match comments' postID
          post.comments = comments.filter(comment => comment.postId === post.id)

          // creating a new card
          let newCard = document.createElement('div')
          newCard.classList.add('card')
          newCard.classList.add('col-sm-3')
          newCard.innerHTML = `<p class="post-title">${post.title}</p>`

          // creating a comments area wrapper
          let commentsArea = document.createElement('div')
          commentsArea.classList.add('card-body')

          // creating the unordered of comments
          let commentsList = document.createElement('ul')
          commentsList.classList.add('list-group')

          // adding each comment as a list item to the list of comments
          post.comments.forEach(cmt => {
            let newComment = document.createElement('li')
            newComment.classList.add('list-group-item')
            newComment.innerText = cmt.body
            commentsList.appendChild(newComment)
          })

          // adding the list to the comments area (which is the card body)
          commentsArea.appendChild(commentsList)

          // adding the card body to the main card area
          newCard.appendChild(commentsArea)

          // adding the card to the html
          entryPoint.appendChild(newCard)
        })
      })
  })

// Promise.all([
//   axios.get(`https://jsonplaceholder.typicode.com/posts`),
//   axios.get(`https://jsonplaceholder.typicode.com/comments`)
// ]).then(response => console.log('response', response))
