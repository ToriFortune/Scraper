
$(document).ready(function() {
    // Gets a reference to the article container div that all the articles will be rendered inside of
    const articleContainer = $(".article-container");
    // Adds event listeners for dynamically generated buttons for deleting articles,
    // pulling up article notes, saving article notes, and deleting article notes
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);
    $(".clear").on("click", handleArticleClear);
  
    function initPage() {
      // Empties the article container, runs an AJAX request for any saved headlines
      $.get("/api/headers").then(function(data) {
        articleContainer.empty();
        // If there are headlines, render them to the page
        if (data && data.length) {
          renderArticles(data);
        } else {
          // Otherwise render a message explaining there are no articles
          renderEmpty();
        }
      });
    }
  
    function renderArticles(articles) {
      // Appends HTML containing article data to the page
      // Passes an array of JSON containing all available articles in the database
      let articleCards = [];
      // Passes each article JSON object to the createCard function which returns a bootstrap
      // card with our article data inside
      for (let i = 0; i < articles.length; i++) {
        articleCards.push(createCard(articles[i]));
      }
      // Once we have all of the HTML for the articles stored in our articleCards array,
      // append them to the articleCards container
      articleContainer.append(articleCards);
    }
  
    function createCard(article) {
      // This function takes in a single JSON object for an article/headline
      // It constructs a jQuery element containing all of the formatted HTML for the
      // article card
      const card = $("<div class='card'>");
      const cardHeader = $("<div class='card-header'>").append(
        $("<h3>").append(
          $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
            .attr("href", article.url)
            .text(article.headline),
          $("<a class='btn btn-danger delete'>Delete</a>"),
          $("<a class='btn btn-info notes'>Notes</a>")
        )
      );
  
      const cardBody = $("<div class='card-body'>").text(article.header);
  
      card.append(cardHeader, cardBody);
  
      // Attaches the article's id to the jQuery element
      // This is used when trying to figure out which article the user wants to remove or open notes for
      card.data("_id", article._id);
      // Returns the constructed card jQuery element
      return card;
    }
  
    function renderEmpty() {
      // This function renders some HTML to the page explaining there aren't have any articles to view
      const emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>No saved articles at this time.</h4>",
          "</div>",
          "<div class='card'>",
          "<div class='card-header text-center'>",
          "<h3>Would You Like to Browse Available Articles?</h3>",
          "</div>",
          "<div class='card-body text-center'>",
          "<h4><a href='/'>Browse Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appends this data to the page
      articleContainer.append(emptyAlert);
    }
  
    function renderNotesList(data) {
      // This function handles rendering note list items to our notes modal
      // Setting up an array of notes to render after finished
      // Also setting up a currentNote constiable to temporarily store each note
      const notesToRender = [];
      let currentNote= "";
      if (!data.notes.length) {
        // If there are no notes, displays a message explaining this
        currentNote = $("<li class='list-group-item'>No notes for this article yet.</li>");
        notesToRender.push(currentNote);
      } else {
        // If there are notes, go through each one
        for (let i = 0; i < data.notes.length; i++) {
          // Constructs an li element to contain our noteText and a delete button
          currentNote = $("<li class='list-group-item note'>")
            .text(data.notes[i].noteText)
            .append($("<button class='btn btn-danger note-delete'>x</button>"));
          // Store the note id on the delete button for easy access when trying to delete
          currentNote.children("button").data("_id", data.notes[i]._id);
          // Adding the currentNote to the notesToRender array
          notesToRender.push(currentNote);
        }
      }
      // Appends the notesToRender to the note-container inside the note modal
      $(".note-container").append(notesToRender);
    }
  
    function handleArticleDelete() {
      // Handles deleting articles/headlines
      // Grabs the id of the article to delete from the card element the delete button sits inside
      const articleToDelete = $(this)
        .parents(".card")
        .data();
  
      // Removes card from page
      $(this)
        .parents(".card")
        .remove();
      // Uses a delete method here just to be semantic since we are deleting an article/headline
      $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
      }).then(function(data) {
        // If this works out, run initPage again which will re-render our list of saved articles
        if (data.ok) {
          initPage();
        }
      });
    }
    function handleArticleNotes(event) {
      // This function handles opening the notes modal and displaying our notes
      // Grabs the id of the article to get notes for from the card element the delete button sits inside
      console.log(event);
      const currentArticle = $(this)
        .parents(".card")
        .data();
      // Grab any notes with this headline/article id
      $.get("/api/notes/" + currentArticle._id).then(function(data) {
        console.log(currentArticle);
        console.log(data);
        // Constructing our initial HTML to add to the notes modal
        const modalText = $("<div class='container-fluid text-center'>").append(
          $("<h4>").text("Notes For Article: " + currentArticle._article_name),
          $("<hr>"),
          $("<ul class='list-group note-container'>"),
          $("<textarea placeholder='New Note' rows='4' cols='60'>"),
          $("<button class='btn btn-success save'>Save Note</button>")
        );
        // Adds the formatted HTML to the note modal
        bootbox.dialog({
          message: modalText,
          closeButton: true
        });
        const noteData = {
          _id: currentArticle._id,
          notes: data || []
        };
        // Adds some information about the article and article notes to the save button for easy access
        // When trying to add a new note
        $(".btn.save").data("article", noteData);
        // renderNotesList will populate the actual note HTML inside of the modal we just created/opened
        renderNotesList(noteData);
      });
    }
  
    function handleNoteSave() {
      // This function handles what happens when a user tries to save a new note for an article
      // Setting a constiable to hold some formatted data about our note,
      // grabbing the note typed into the input box
      let noteData = {};
      const newNote = $(".bootbox-body textarea")
        .val()
        .trim();
      // If there actually is data typed into the note input field, this formats it
      // and posts it to the "/api/notes" route and send the formatted noteData as well
      if (newNote) {
        noteData = { _headlineId: $(this).data("article")._id, noteText: newNote };
        $.post("/api/notes", noteData).then(function() {
          // When complete, close the modal
          bootbox.hideAll();
        });
      }
    }
  
    function handleNoteDelete() {
      // Handles the deletion of notes
      // Grab the id of the note we want to delete
      // This data was stored on the delete button when it was created
      const noteToDelete = $(this).data("_id");
      // Perform an DELETE request to "/api/notes/" with the id of the note to be deleted as a parameter
      $.ajax({
        url: "/api/notes/" + noteToDelete,
        method: "DELETE"
      }).then(function() {
        // When done, hide the modal
        bootbox.hideAll();
      });
    }
  
    function handleArticleClear() {
      $.get("api/clear")
        .then(function() {
          articleContainer.empty();
          initPage();
        });
    }

    initPage();
  });
  // 