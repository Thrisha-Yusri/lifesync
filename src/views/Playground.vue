<script>
import { db } from '@/firebase'; // Import Firebase
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);
        this.events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>
