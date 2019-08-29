/*
Import the external libraries:
- faker
*/
import faker from 'faker';

/*
Import the internal libraries:
- logger
- News
- Category
- NewsPost
- User
*/
import { logger } from '../../../utilities';
import { News, Category, NewsPost, User, Meeting, Building, Floor, Facility, HelpCentreItem } from './schemas';

class Seeder {
    constructor() {
        this.news = [];
        this.categories = [];
        this.newsposts = [];
        this.users = [];
        this.meetings = [];
        this.buildings = [];
        this.floors = [];
        this.facilities = [];
        this.helpCentreItems = [];
    }

    /*
    Model
    */
    newsCreate = async (title, description) => {
        const newsDetail = {
            title,
            description,
            categoryId: this.getRandomCategory(),
            newsposts: this.getRandomNewsPosts(),
        };
        const news = new News(newsDetail);

        try {
            const newnews = await news.save();
            this.news.push(newnews);

            logger.log({ level: 'info', message: `News created with id: ${newnews.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a news: ${err}!` });
        }
    }

    categoryCreate = async (name, description) => {
        const categoryDetail = {
            name,
            description,
        };
        const category = new Category(categoryDetail);

        try {
            const newCategory = await category.save();

            this.categories.push(newCategory);

            logger.log({ level: 'info', message: `Category created with id: ${newCategory.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a category: ${err}!` });
        }
    }

    newspostCreate = async (title, body) => {
        const newspostDetail = {
            title,
            body,
            categoryId: this.getRandomCategory(),
            authorId: this.getRandomUser(),
        };
        const newspost = new NewsPost(newspostDetail);

        try {
            const newNewsPost = await newspost.save();
            this.newsposts.push(newNewsPost);

            logger.log({ level: 'info', message: `Newspost created with id: ${newNewsPost.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a newspost: ${err}!` });
        }
    }

    userCreate = async (email, password) => {
        const userDetail = {
            email,
            localProvider: {
                password,
            },
        };
        const user = new User(userDetail);

        try {
            const newUser = await user.save();
            this.users.push(newUser);

            logger.log({ level: 'info', message: `User created with id: ${newUser.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a user: ${err}!` });
        }
    }

    meetingCreate = async (title, details, date, startTime, EndTime, room, participantIds, runningOrder, dresscode) => {
        const meetingDetail = {
            title, details, date, startTime, EndTime, room, participantIds, runningOrder, dresscode
        };
        const meeting = new Meeting(meetingDetail);

        try {
            const newMeeting = await meeting.save();
            this.meetings.push(newMeeting);

            logger.log({ level: 'info', message: `Meeting created with id: ${newMeeting.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a meeting: ${err}!` });
        }
    }

    buildingCreate = async(name, image, longitude, latitude) => {
        const buildingDetail = {
            name, 
            image, 
            coords:{
                longitude,
                latitude
            }
        };
        const building = new Building(buildingDetail);

        try {
            const newBuilding = await building.save();
            this.buildings.push(newBuilding);

            logger.log({ level: 'info', message: `Building created with id: ${newBuilding.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a building: ${err}!` });
        }
    }

    floorCreate = async (name, floorplan) => {
        const floorDetail = {
            name, 
            floorplan, 
            buildingId: this.getRandomBuilding()
        };
        const floor = new Floor(floorDetail);

        try {
            const newFloor = await floor.save();
            this.floors.push(newFloor);

            logger.log({ level: 'info', message: `Floor created with id: ${newFloor.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a floor: ${err}!` });
        }
    }

    facilityCreate = async (name, iconName) => {
        const facilityDetail = {
            name, 
            iconName, 
        };
        const facility = new Facility(facilityDetail);

        try {
            const newFacility = await facility.save();
            this.facilities.push(newFacility);

            logger.log({ level: 'info', message: `Facility created with id: ${newFacility.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a facility: ${err}!` });
        }
    }

    helpCentreItemCreate = async (question, steps) => {
        const helpCentreItemDetail = {
            question,
            steps 
        };
        const helpCentreItem = new HelpCentreItem(helpCentreItemDetail);

        try {
            const newHelpCentreItem = await helpCentreItem.save();
            this.helpCentreItems.push(newHelpCentreItem);

            logger.log({ level: 'info', message: `Help centre item created with id: ${newHelpCentreItem.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a help centre item: ${err}!` });
        }
    }

    /* 
    Create instances of the model
    */
    createNews = async () => {
        await Promise.all([
            (async () => this.newsCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
        ]);
    }

    createCategories = async () => {
        await Promise.all([
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
        ]);
    }

    createNewsPosts = async () => {
        await Promise.all([
            (async () => this.newspostCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
            (async () => this.newspostCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
            (async () => this.newspostCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
            (async () => this.newspostCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
            (async () => this.newspostCreate(faker.lorem.sentence(), faker.lorem.paragraph()))()
        ]);
    }

    createUsers = async () => {
        await Promise.all([
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.internet.email(), 'wicked4u'))(),
        ]);
    }

    createMeetings = async () => {
        await Promise.all([
            (async () => this.meetingCreate( faker.random.words(3), faker.random.sentence, "2019-08-30", "09:30:00", "13:00:00", "room 1", ["5d5aaf295ee12b1ed6e909e0"], [faker.random.word(), faker.random.word(), faker.random.word()],"Casual"))(),
            (async () => this.meetingCreate( faker.random.words(3), faker.random.sentence, "2019-08-30", "14:30:00", "16:00:00", "room 3", ["5d5aaf295ee12b1ed6e909e0"], [faker.random.word(), faker.random.word(), faker.random.word()],"Casual"))(),
            (async () => this.meetingCreate( faker.random.words(3), faker.random.sentence, "2019-08-23", "14:30:00", "16:00:00", "room 3", ["5d5aaf295ee12b1ed6e909e0"], [faker.random.word(), faker.random.word(), faker.random.word()],"Casual"))(),
            (async () => this.meetingCreate( faker.random.words(3), faker.random.sentence, "2019-08-28", "14:30:00", "16:00:00", "room 3", ["5d5aaf295ee12b1ed6e909e0"], [faker.random.word(), faker.random.word(), faker.random.word()],"Casual"))(),
        ]);
    }

    createBuildings = async () => {
        await Promise.all([
            (async () => this.buildingCreate( faker.random.word(), "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/Buildings%2FBuilding1.jpg?alt=media&token=f0c474c7-ad17-4462-ab33-4098bccdb3f0", faker.address.longitude(), faker.address.latitude() ))(),
            (async () => this.buildingCreate( faker.random.word(), "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/Buildings%2FBuilding2.jpg?alt=media&token=5e47f521-892c-4533-a357-686ebbd8d0bd", faker.address.longitude(), faker.address.latitude() ))(),
        ]);
    }

    createFloors = async () => {
        await Promise.all([
            (async () => this.floorCreate( "Floor 1", "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/FloorPlans%2FAsset%203-100.png?alt=media&token=5e80d258-aaa7-48c6-ae96-f5e4ad6e147e" ))(),
            (async () => this.floorCreate( "Floor 2", "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/FloorPlans%2FAsset%203-100.png?alt=media&token=5e80d258-aaa7-48c6-ae96-f5e4ad6e147e" ))(),
            (async () => this.floorCreate( "Floor 3", "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/FloorPlans%2FAsset%203-100.png?alt=media&token=5e80d258-aaa7-48c6-ae96-f5e4ad6e147e" ))(),
            (async () => this.floorCreate( "Floor 4", "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/FloorPlans%2FAsset%203-100.png?alt=media&token=5e80d258-aaa7-48c6-ae96-f5e4ad6e147e" ))(),
            (async () => this.floorCreate( "Floor 5", "https://firebasestorage.googleapis.com/v0/b/bapgdm.appspot.com/o/FloorPlans%2FAsset%203-100.png?alt=media&token=5e80d258-aaa7-48c6-ae96-f5e4ad6e147e" ))(),
        ]);
    }

    createFacilities = async () => {
        await Promise.all([
            (async () => this.facilityCreate( "Printer","printer" ))(),
            (async () => this.facilityCreate( "Ontspanningsruimte","tv" ))(),
        ]);
    }

    createHelpCentreItems = async () => {
        await Promise.all([
            (async () => this.helpCentreItemCreate( 
                "Hoe maak ik een nieuwe meeting aan?",
                [faker.random.words(6), faker.random.words(10), faker.random.words(6)]
            ))(),
            (async () => this.helpCentreItemCreate( 
                "Hoe verander ik de details van een meeting?",
                [faker.random.words(12), faker.random.words(5), faker.random.words(7)]
            ))(),
            (async () => this.helpCentreItemCreate( 
                "Hoe verwijder ik een meeting?",
                [faker.random.words(4), faker.random.words(12), faker.random.words(6)]
            ))(),
        ]);
    }

    /*
    Get Random
    */
    getRandomCategory = () => {
        let category = null;
        if (this.categories && this.categories.length > 0) {
            category = this.categories[Math.round(Math.random() * (this.categories.length - 1))];
        }
        return category;
    }

    getRandomNewsPosts = () => {
        let NewsPosts = null;
        if (this.newsposts && this.newsposts.length > 0) {
            const NewsPosts = Math.round(Math.random() * (this.newsposts.length - 1));
            NewsPosts = this.newsposts.slice(0, this.newsposts.length);
            while (NewsPosts.length > NewsPosts) {
                NewsPosts.splice(Math.round(Math.random() * (this.newsposts.length - 1)), 1);
            }
        }
        return cNewsPosts;
    }

    getRandomUser = () => {
        let user = null;
        if (this.users && this.users.length > 0) {
            user = this.users[Math.round(Math.random() * (this.users.length - 1))];
        }
        return user;
    }

    getRandomBuilding = () => {
        let building = null;
        if (this.buildings && this.buildings.length > 0) {
            building = this.buildings[Math.round(Math.random() * (this.users.length - 1))];
        }
        return building;
    }

    /*
    Seeder
    */
    seed = async () => {
        this.users = await User.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createUsers();
            }
            return User.find().exec();
        });

        this.categories = await Category.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createCategories();
            }
            return Category.find().exec();
        });

        this.newsposts = await NewsPost.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createNewsPosts();
            }
            return NewsPost.find().exec();
        });

        this.news = await News.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createNews();
            }
            return News.find().exec();
        });

        this.meetings = await Meeting.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createMeetings();
            }
            return Meeting.find().exec();
        })

        this.buildings = await Building.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createBuildings();
            }
            return Building.find().exec();
        })

        this.floors = await Floor.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createFloors();
            }
            return Floor.find().exec();
        })

        this.facilities = await Facility.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createFacilities();
            }
            return Facility.find().exec();
        })

        this.helpCentreItems = await HelpCentreItem.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createHelpCentreItems();
            }
            return HelpCentreItem.find().exec();
        })
    }
}
export default Seeder;
