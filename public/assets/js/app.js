const app = {
    changeArticleStatus: (saved, btn) => {    
      $.ajax({
        method: "PUT",
        url: "/api/article",
        data: {id: btn.id, save: saved}
      }).then(function(data) {
        if (data) location.reload();
      });
    },
    deleteNote: (btn) => {
      $.ajax({
        method: "DELETE",
        url: "/api/article/note",
        data: {
          articleID:  $("#btnHolder .saveNote").data("article"),
          noteID: btn.noteid
        }
      }).then(function(data) {
        $("#noteModal").modal('hide');
      });
    },
    getHtml: (type, data) => {
      let html;
      switch (type)
      {
        case "noNotes":
          html = `<h2 class='list-group-item note'>
              No notes have been added to this article yet
            </h2>`
          break;
        case "note":
          //data = note
          html = `<h2 class='list-group-item note'>
              <div class='row align-items-center'>
                <div class='col-sm-10'>
                  ${data.text}
                </div>
                <div class='col-sm-2'>
                  <button class='btn btn-danger delete-note'
                  data-noteID=${data._id}>x</button>
                </div>
              <div>
            </h2>`
          break;
        case "modalBtn":
          //data = article id
          html = `<button type="button" class="btn btn-success saveNote" 
            data-article=${data}>Save Note</button>`;
          break;
      }
      return html
    },
    saveNote: (btn) => {
      const userNote = $("#noteText")[0].value;
      if (!userNote)
      {
        toastr["error"]("Your note can not be blank!");
        return;
      }
      $.ajax({
        method: "POST",
        url: "/api/article/note",
        data: {
          articleID: btn.article,
          noteText: userNote
        }
      }).then(function(data) {
        console.log(data);
        $("#noteModal").modal('hide');
  
      });
    },
    scrapeArticles: () => {
      $.getJSON("/api/scrape").then(function(data) {     
        toastr[data.type](data.message);
        if (data.type === "success")
        {
          setTimeout(() => location.reload(),1500);
        } 
      });
    },
    showNotes: (btn) => {
      //get notes for this article from db
      $.get("/api/article/notes/"+ btn.data("id"))
      .then(function(article) {      
        let noteHtml = "";
  
        //set Modal details
        $("#noteheadline").text(article.headline);
        $("#noteText")[0].value = "";
        
        article.notes.forEach(note => {
          //loop through all notes for article and create h2 
          noteHtml += app.getHtml("note", note);
        });
  
        //msg if no notes for article in db
        if (noteHtml === "") noteHtml = app.getHtml("noNotes");
  
        $("#noteHolder").html(noteHtml);
  
        //add save btn for current note
        $("#btnHolder").html(app.getHtml("modalBtn", article._id))
      });
    },
  }
  
  $(document).ready(function() {
      $(document).on("click", ".btn.save", (e) => app.changeArticleStatus(true,e.target));
      $(document).on("click", ".btn.btn-delete", (e) => app.changeArticleStatus(false,$(e.target)[0].dataset));
      $(document).on("click", ".scrape-new", () => app.scrapeArticles());
      $(document).on("click", ".btn.saveNote", (e) => app.saveNote(e.currentTarget.dataset));
      $(document).on("click", ".btn.delete-note", (e) => app.deleteNote(e.currentTarget.dataset));
      $('#noteModal').on('show.bs.modal', (e) => app.showNotes($(e.relatedTarget)));
  
    //   toastr.options = {
    //     "closeButton": true,
    //     "debug": false,
    //     "newestOnTop": true,
    //     "progressBar": false,
    //     "positionClass": "toast-top-full-width",
    //     "preventDuplicates": true,
    //     "onclick": null,
    //     "showDuration": "300",
    //     "hideDuration": "1000",
    //     "timeOut": "5000",
    //     "extendedTimeOut": "1000",
    //     "showEasing": "swing",
    //     "hideEasing": "linear",
    //     "showMethod": "fadeIn",
    //     "hideMethod": "fadeOut"
    //   }
    // });