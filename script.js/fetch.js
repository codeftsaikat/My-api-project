fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data); 

        renderPosts(data.posts);
    })
    .catch(function(error) {
        console.error('Fetch Error:', error);
    });




let readCount = 0; 

function renderPosts(posts) {
    const postsSection = document.getElementById('postsSection');
    posts.forEach(post => {
        const postMain = document.createElement('div');
        postMain.classList.add("mt-10");

        postMain.innerHTML = `
          <div class="bg-gray-100 rounded-2xl border border-solid w-[900px] h-auto p-8  gap-3">
          <div class="flex gap-8">
            <div class="relative border rounded-2xl bg-cover" style="background-image: url(${post.image}); height: 60px; width: 65px;">
                <div class="absolute top-1 -right-3 -mt-2 mr-2 h-4 w-4 rounded-full" style="background-color: ${post.isActive ? '#10B981' : 'red'};"></div>
             </div>
            <div class="text-black flex gap-6">
                <p># ${post.category}</p>
                <p>Author: ${post.author.name}</p>
            </div>
            </div>
            <div>
            <h3 class="text-xl text-black font-medium mb-4 mt-2">${post.title}</h3>
            <p>${post.description}</p>
            <div class="flex justify-between mt-11">
                <div class="flex gap-8">
                    <div class="flex gap-2">
                        <img src="images/Group 13.png">
                        <p>${post.view_count}</p>
                    </div>
                    <div class="flex gap-2">
                        <img src="images/Group 16.png">
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex gap-2">
                        <img src="images/Group 18.png">
                        <p>${post.posted_time} min</p>
                    </div>
                </div>
                <div class="image-on cursor-pointer"><img src="images/Group 40106.png" alt=""></div>
            </div>
            </div>
            </div>
        `;

        const readCard = document.getElementById("readCard");
        
        const logPostBtn = postMain.querySelector('.image-on');
        logPostBtn.addEventListener('click', () => {
            console.log(post); 

            const readComp = document.createElement("div");
            readComp.innerHTML = `
                <div class="bg-white rounded-lg p-6 flex justify-between mb-3 mt-3">
                    <p class="text-black text-xl font-semibold">${post.title}</p>
                    <div class="flex items-center gap-2">
                        <img src="images/Group 16.png" alt="">
                        <p>1,568</p>
                    </div>
                </div>
            `;
            readCard.appendChild(readComp);
            
            readCount++;
            const markAsReadText = document.getElementById('markAsReadText');
            markAsReadText.textContent = `Mark as read (${readCount})`;
        });

        postsSection.appendChild(postMain);
    });
}





    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const cardContainer = document.getElementById('cardContainer');
        data.forEach(item => {
          const card = document.createElement('section');
          card.className = 'mb-20';
          card.innerHTML = `
            <div class="bg-gray-100 p-6 rounded-2xl mt-8">

              <img src="${item.cover_image}" alt="Cover Image"/>
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-calendar-days"></i>
                <p class="mt-1.5">${item.author.posted_date ?? 'No Publish Date'}</p>
              </div>
              <h3 class="text-black text-xl font-medium mt-2 mb-2">${item.title}</h3>
              <p>${item.description}</p>
              <div>
              <div class="flex gap-5 mt-8">
                    <div id="avatar" class="w-20 h-20 rounded-full overflow-hidden">
              <img src="${item.profile_image}" alt="Cover Image"/>
              </div>
                <div>
                <p class="text-black font-medium text-base mt-2 mb-2">${item.author.name}</p>
                <p>${item.author.designation ?? 'Unknown'}</p>
                </div>
              </div>
                
              </div>
            </div>
          `;
          cardContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
