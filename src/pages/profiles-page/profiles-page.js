import User from "../../models/user.js";
import { injectCSS } from "../../utils/injectCSS.js";
import { addItemToLocalStorage } from "../../utils/storageUtil.js";
import TemplateCache from "../../utils/templateCache.js";
import globalState from "../../stores/globalState.js";
import CryptocurrencyPage from "../cryptocurrency-page/cryptocurrency-page.js";

const ProfilesPage = (function () {
    const cssPath = 'src/pages/profiles-page/profiles-page.css';
    const htmlPath = 'src/pages/profiles-page/profiles-page.html';

    function render() {
        injectCSS(cssPath, true);

        TemplateCache.getTemplate(htmlPath, function (template) {
            $("#app").css("height", "100vh");

            $(document).ready(function () {
                let users = JSON.parse(localStorage.getItem("users")) || [];

                if (users.length === 0) {
                    const isFirstVisit = localStorage.getItem("firstVisit")

                    if (isFirstVisit === null) {
                        // Default users
                        const defaultUsers = [
                            new User("Arda Becanım"),
                            new User("Hüseyin Kerem Coşkun"),
                            new User("Mustafa Oktay Giniş"),
                            new User("Sezer Tetik"),
                        ];
                        localStorage.setItem("users", JSON.stringify(defaultUsers));
                        localStorage.setItem("firstVisit", false);
                        users = defaultUsers;
                    }
                }

                if (users.length)
                    $('.user-part').css("display", "none");
                for (const user of users) {
                    const profileCardHtml = profileCard(user.name);
                    // Add data-id attribute to the profile card
                    const $profileCardHtml = $(profileCardHtml); // convert the string to a jQuery object
                    $($profileCardHtml).attr("data-id", user.id);
                    $('.profile-cards').append($profileCardHtml);
                }
                $('.new-profile').click(function () {
                    $('.overlay').fadeIn();
                    $(".overlay").toggleClass("overlay-active");

                });
                $(".overlay").click(function () {
                    $('.overlay').fadeOut();
                    $(".overlay").fadeOut(function () {
                        $(".overlay").toggleClass("overlay-active");
                    });
                });
                $(".modal").click(function (e) {
                    e.stopPropagation();
                });
                $(".modal button").click(function () {
                    addProfile()
                    $('.overlay').fadeOut();
                    $(".overlay").fadeOut(function () {
                        $(".overlay").toggleClass("overlay-active");
                    });
                })

                $('.profile-cards').on("click", '.delete-btn', function (e) {
                    e.stopPropagation();
                    $(this).closest('.user-card').fadeOut(function () {
                        $(this).remove();
                        let users = JSON.parse(localStorage.getItem("users")) || [];
                        users = users.filter(user => user.id !== $(this).data("id"));

                        if (!users.length)
                            $('.user-part').css("display", "block");

                        localStorage.setItem("users", JSON.stringify(users));
                    });
                })

                $(".profile-cards").on("click", ".user-card", function () {
                    const userId = $(this).data("id");
                    const user = JSON.parse(localStorage.getItem("users")).find(user => user.id === userId);
                    globalState.currentUser = user;
                    CryptocurrencyPage.render();
                })
            })

            $("#content").html(template);
        })
    }

    return { render }
})();


const profileCard = (profileName) =>
    `
    <div class="user-card">
        <span class="delete-btn">x</span>
        <i class="fa-solid fa-user"></i>
        <div>${profileName}</div>
    </div>
`;

function addProfile() {
    const profileName = $('.modal input').val();

    if (profileName) {
        const createdUser = new User(profileName);
        const profileCardHtml = profileCard(createdUser.name);

        // Add data-id attribute to the profile card
        const $profileCardHtml = $(profileCardHtml);
        $($profileCardHtml).attr("data-id", createdUser.id);


        $('.profile-cards').append($profileCardHtml);
        $('.modal input').val('');
        $(".overlay").fadeOut();
        $('.user-part').css("display", "none");
        addItemToLocalStorage("users", createdUser);
    }
}

export default ProfilesPage;